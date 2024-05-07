type PrometheusMetrics = {
  value: string;
  labels: Record<string, string>;
  buckets: Record<string, string>;
}

export type PrometheusMetricParser = {
    name: string;
    help: string;
    type: string;
    metrics: PrometheusMetrics[];
};


export interface MetricsState {
    dataUnpacked: number
    dataPacked: number
    storageAvailable: number
    hashRate: number | null
    arweaveSize:number | null
    minerMetrics: PrometheusMetrics[] | undefined
} 