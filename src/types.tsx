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

export interface MetricsState {
  totalStorageSize:number
  totalReadRate:number
  totalIdealReadRate:number
  totalHashRate:number
  totalIdealHashRate:number
  minerRates: { [key: string]: { [key: string]: string; }; },
  weaveSize: number | null;
  minerMetrics: PrometheusMetrics[] | undefined;
}
