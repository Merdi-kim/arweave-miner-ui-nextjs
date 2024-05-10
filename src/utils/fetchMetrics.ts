import {
  MetricsState,
  PrometheusMetricParser,
  PrometheusMetrics,
} from "@/types";
//@ts-expect-error
import parsePrometheusTextFormat from "parse-prometheus-text-format";

const fetchRawMinerMetrics = async () => {
  try {
    const res = await fetch("http://s1.ddns.me:1985/metrics");
    const data = await res.text();
    return data;
  } catch (err) {
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

export const fetchMetrics = async (): Promise<MetricsState> => {
  let minerMetrics: Array<PrometheusMetrics> = [];
  let totalStorageSize:number = 0
  let totalReadRate:number = 0
  let totalIdealReadRate:number = 0
  let totalHashRate:number = 0
  let totalIdealHashRate:number = 0

  const data = await fetchRawMinerMetrics();
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
        totalStorageSize += Number(item.labels.storage_module_size)
        totalReadRate += Number(item.labels.read)
        totalIdealReadRate += Number(item.labels.ideal_read)
        totalHashRate += Number(item.labels.hash)
        totalIdealHashRate += Number(item.labels.ideal_hash)
      }
    });
  }

  const weaveSizeMetric = parsedData.find(
    (item: PrometheusMetricParser) => item.name === "weave_size",
  );
  const weaveSize = Number(weaveSizeMetric?.metrics[0].value);
  console.log("Done fetching metrics ✨");

  minerMetrics = minerMetrics.sort(
    (a, b) =>
      parseInt(a.labels.partition_number) - parseInt(b.labels.partition_number),
  );

  return { totalStorageSize, totalReadRate, totalIdealReadRate, totalHashRate, totalIdealHashRate, minerRates, weaveSize, minerMetrics };
};
