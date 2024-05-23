export type PrometheusMetrics = {
  value: string;
  labels: Record<string, string>;
  buckets: Record<string, string>;
};

export type PrometheusMetricParser = {
  name: string;
  help: string;
  type: string;
  metrics: PrometheusMetrics[];
};

export type MinerInfo = {
  hostname: string;
  protocol: string;
  port: string;
};

export type TotalMetrics = {
  totalStorageSize: number;
  totalReadRate: number;
  totalIdealReadRate: number;
  totalIdealHashRate: number;
  totalHashRate: number;
};

export type MetricsState = TotalMetrics & {
  minerRates: { [key: string]: { [key: string]: string } };
  weaveSize: number | null;
  minerMetrics: PrometheusMetrics[] | undefined;
  coordinatedMiningData: { [key: string]: { [key: string]: any } };
};
