import {
  MetricsState,
  PrometheusMetricParser,
  PrometheusMetrics,
} from "@/types";
//@ts-expect-error
import parsePrometheusTextFormat from "parse-prometheus-text-format";

const fetchRawMinerMetrics = async () => {
  try {
    const res = await fetch("http://s1.ddns.me:1984/metrics");
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

  const data = await fetchRawMinerMetrics();
  const parsedData: PrometheusMetricParser[] =
    parsePrometheusTextFormat(data) || [];

  const miningRates = getMiningRateData(parsedData);

  const dataByPacking = parsedData.find(
    (item: PrometheusMetricParser) =>
      item.name === "v2_index_data_size_by_packing",
  );
  if (dataByPacking) {
    dataByPacking.metrics.forEach((item) => {
      //this check will filter out unpacked data
      if (item.labels.packing !== "unpacked") {
        const miningRatesForPartition =
          miningRates[item.labels.partition_number];
        item.labels = { ...item.labels, ...miningRatesForPartition };
        minerMetrics.push(item);
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

  return { weaveSize, minerMetrics };
};
