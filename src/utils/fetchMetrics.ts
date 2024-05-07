import { MetricsState, PrometheusMetricParser } from "@/types";
//@ts-expect-error
import parsePrometheusTextFormat from "parse-prometheus-text-format";

const fetchRawMinerMetrics = async() => {
    try {
        const res = await fetch('http://s1.ddns.me:1984/metrics')
        const data = await res.text()
        return data
    }catch(err) {
        throw new Error('Something went wrong while fetching miner\'s metrics')
    }
}


export const fetchMetrics = async():Promise<MetricsState> => {
    console.log('fetching metrics...')
    const data = await fetchRawMinerMetrics()
    const parsedData:PrometheusMetricParser[] = parsePrometheusTextFormat(data) || []
    let dataUnpacked = 0;
    let dataPacked = 0;
    let storageAvailable = 0;
    const dataByPacking = parsedData.find((item: PrometheusMetricParser) => item.name === "v2_index_data_size_by_packing");
    const minerMetrics = dataByPacking?.metrics
    if(minerMetrics) {
        minerMetrics.forEach(item => {
            if (item.labels.packing == "unpacked") {
                dataUnpacked += +item.value;
            } else {
                dataPacked += +item.value;
            }
            const partitionSize = Number(item.labels.storage_module_size)
            if (isFinite(partitionSize)) {
                storageAvailable += partitionSize;
            } 
        })
    }
    let hashRate = null

    const weaveSize = parsedData.find((item:PrometheusMetricParser) => item.name === "weave_size")
    const arweaveSize = Number(weaveSize?.metrics[0].value)  

    const miningRateData = parsedData.find((item: PrometheusMetricParser) => item.name === "mining_rate");
    /*if(miningRateData) {
        miningRateData.metrics.forEach(item => {
            console.log(item.labels)
            /*if (item.labels.packing == "unpacked") {
                dataUnpacked += +item.value;
            } else {
                dataPacked += +item.value;
            }
            const partitionSize = Number(item.labels.storage_module_size)
            if (isFinite(partitionSize)) {
                storageAvailable += partitionSize;
            } * /
        })
    }*/
    console.log('Done fetching metrics ✨')

    return {dataUnpacked, dataPacked, storageAvailable, hashRate, arweaveSize, minerMetrics }
}