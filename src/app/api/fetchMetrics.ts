import {
  MetricsState,
  PrometheusMetricParser,
  PrometheusMetrics,
} from "@/types";
//@ts-expect-error
import parsePrometheusTextFormat from "parse-prometheus-text-format";

const fetchRawMinerMetrics = async (
  url: string, //= "http://testnet-2.arweave.net:1984/metrics",
) => {
  try {
    const res = await fetch(url);
    const data = await res.text();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong while fetching miner's metrics");
  }
};

const getMiningRateData = (data: PrometheusMetricParser[]) => {
  const miningRateData = data.find(
    (item: PrometheusMetricParser) => item.name === "mining_rate",
  );
  let groupedMiningRateData = {} as {
    [key: string]: { [key: string]: string };
  };

  if (miningRateData) {
    miningRateData.metrics.forEach((item) => {
      let partition = item.labels.partition;
      if (!groupedMiningRateData.hasOwnProperty(partition)) {
        groupedMiningRateData[partition] = {};
      }
      groupedMiningRateData[partition] = {
        ...groupedMiningRateData[partition],
        [item.labels.type]: item.value,
      };
    });
  }
  return groupedMiningRateData;
};

const getCoordinatedMiningData = (data: PrometheusMetricParser[]) => {
  const resultH1 = data.find(
    (item: PrometheusMetricParser) => item.name === "cm_h1_rate",
  );

  const resultH2 = data.find(
    (item: PrometheusMetricParser) => item.name === "cm_h2_count",
  );

  let coordinatedMiningData: { [key: string]: { [key: string]: any } } = {};

  resultH1?.metrics.forEach((metric) => {
    if (!coordinatedMiningData[metric.labels.peer]) {
      coordinatedMiningData[metric.labels.peer] = {};
    }
    coordinatedMiningData[metric.labels.peer] = {
      h1: {
        from: metric.labels.direction == "from" ? metric.value : "0.0",
        to: metric.labels.direction == "to" ? metric.value : "0.0",
      },
    };
  });

  resultH2?.metrics.forEach((metric) => {
    if (!coordinatedMiningData[metric.labels.peer]) {
      coordinatedMiningData[metric.labels.peer] = {};
    }
    coordinatedMiningData[metric.labels.peer] = {
      ...coordinatedMiningData[metric.labels.peer],
      h2: {
        from: metric.labels.direction == "from" ? metric.value : "0.0",
        to: metric.labels.direction == "to" ? metric.value : "0.0",
      },
    };
  });
  return coordinatedMiningData;
};

export const fetchMetrics = async (url: string): Promise<MetricsState> => {
  let minerMetrics: Array<PrometheusMetrics> = [];
  let totalStorageSize: number = 0;
  let totalReadRate: number = 0;
  let totalIdealReadRate: number = 0;
  let totalHashRate: number = 0;
  let totalIdealHashRate: number = 0;

  const data = await fetchRawMinerMetrics(url);
  const parsedData: PrometheusMetricParser[] =
    parsePrometheusTextFormat(data) || [];

  const minerRates = getMiningRateData(parsedData);

  const dataByPacking = parsedData.find(
    (item: PrometheusMetricParser) =>
      item.name === "v2_index_data_size_by_packing",
  );

  if (dataByPacking) {
    dataByPacking.metrics.forEach((item) => {
      //this check will filter out unpacked data
      if (item.labels.packing !== "unpacked") {
        const miningRatesForPartition =
          minerRates[item.labels.partition_number];
        item.labels = { ...item.labels, ...miningRatesForPartition };
        minerMetrics.push(item);
        //console.log(item)
        totalStorageSize += Number(item.labels.storage_module_size);
        totalReadRate += Number(item.labels.read);
        totalIdealReadRate += Number(item.labels.ideal_read);
        totalHashRate += Number(item.labels.hash);
        totalIdealHashRate += Number(item.labels.ideal_hash);
      }
    });
  }
  console.log(minerMetrics);

  /*const minerMetricsWithNoDuplicates = minerMetrics.reduce((prev:Array<PrometheusMetrics>, curr:PrometheusMetrics) => {
    if(!prev.some((obj:PrometheusMetrics) => obj.labels.partition_number === curr.labels.partition_number)) {
      prev.push(curr)
    }
    return prev
  }, [])*/

  const coordinatedMiningData = getCoordinatedMiningData(parsedData);

  const weaveSizeMetric = parsedData.find(
    (item: PrometheusMetricParser) => item.name === "weave_size",
  );
  const weaveSize = Number(weaveSizeMetric?.metrics[0].value);
  console.log("Done fetching metrics ✨");

  minerMetrics = minerMetrics.sort(
    (a, b) =>
      parseInt(a.labels.partition_number) - parseInt(b.labels.partition_number),
  );

  return {
    totalStorageSize,
    totalReadRate,
    totalIdealReadRate,
    totalHashRate,
    totalIdealHashRate,
    minerRates,
    weaveSize,
    minerMetrics,
    coordinatedMiningData,
  };
};
