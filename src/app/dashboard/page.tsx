'use client'

import MetricsCard from "./components/cards/MetricsCard";
import { useSetRecoilState } from "recoil";
import { metrics } from "@/store";
import { useEffect, useState } from "react";
import { PrometheusMetrics } from "@/types";

const Dashboard = () => {
  const [ metricsData, setMetricsData ] = useState<Array<PrometheusMetrics> | undefined>([])
  const setMinerMetrics = useSetRecoilState(metrics)
  let minerRatesOverTime:Array<{time:string, data:any}> = []

  useEffect(() => {
    const getData = async() => {
      const data = await fetch('/api')
      const {minerRates, weaveSize, minerMetrics:metricsDataFromApi} = await data.json()
      const currentDate = new Date()
      const minerRateWithTimeStamp = {
        time:`${currentDate.getHours()} : ${currentDate.getMinutes()}`,
        data: minerRates
      }
      minerRatesOverTime = [...minerRatesOverTime, minerRateWithTimeStamp]
      setMinerMetrics(minerRatesOverTime)
      setMetricsData(metricsDataFromApi)
    }

    getData()
    setInterval(() =>getData(), 10000)
  }, [])

  return (
    <div className="h-full w-full p-4">
      <div className="w-full flex flex-col items-center">
        <h2 className="mb-10">Miner Output</h2>
        <div className="w-full flex flex-col items-center">
          {metricsData?.map((metric, index) => (
            <MetricsCard key={index} metric={metric} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
