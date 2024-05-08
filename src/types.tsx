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
  weaveSize: number | null;
  minerMetrics: PrometheusMetrics[] | undefined;
}
