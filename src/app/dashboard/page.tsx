'use client'

import MetricsCard from "./components/cards/MetricsCard";
import { useSetRecoilState } from "recoil";
import { metrics } from "@/store";
import { useEffect, useState } from "react";
import { PrometheusMetrics } from "@/types";

const Dashboard = () => {
  const [ metricsData, setMetricsData ] = useState<Array<PrometheusMetrics> | undefined>([])
  const [ totalMetrics, setTotalMetrics ] = useState<{totalStorageSize:number, totalReadRate:number, totalIdealReadRate:number, totalIdealHashRate:number, totalHashRate:number}>({totalStorageSize:0, totalReadRate:0, totalIdealReadRate:0, totalIdealHashRate:0, totalHashRate:0})
  const setMinerMetrics = useSetRecoilState(metrics)
  let minerRatesOverTime:Array<{time:string, data:any}> = []

  useEffect(() => {
    const getData = async() => {
      const data = await fetch('/api')
      const {totalStorageSize, totalReadRate, totalIdealReadRate, totalHashRate, totalIdealHashRate, minerRates, weaveSize, minerMetrics:metricsDataFromApi} = await data.json()
      const currentDate = new Date()
      const minerRateWithTimeStamp = {
        time:`${currentDate.getHours()} : ${currentDate.getMinutes()}`,
        data: minerRates
      }
      minerRatesOverTime = [...minerRatesOverTime, minerRateWithTimeStamp]
      setMinerMetrics(minerRatesOverTime)
      setMetricsData(metricsDataFromApi)
      setTotalMetrics({totalStorageSize, totalReadRate, totalIdealReadRate, totalIdealHashRate, totalHashRate})
    }

    getData()
    setInterval(() =>getData(), 30000)
  }, [])

  return (
    <div className="h-full w-full p-4">
      <div className="w-full flex flex-col items-center">
        <h2 className="mb-10">Miner Output</h2>
        <div className="w-full flex flex-col items-center">
          <div className="w-full md:w-[750px] lg:w-[900px] py-4">
            <div className="justify-evenly text-sm sm:text-base font-light">
              <div className="m-2">Total Storage : <span className="font-bold">{Number(totalMetrics.totalStorageSize/1000000000000).toFixed(1)} TB</span></div>
              <div className="m-2">Total Read Rate : <span className="font-bold">{totalMetrics.totalReadRate.toFixed(1)} MiB/s</span></div>
              <div className="m-2">Total Hash Rate : <span className="font-bold">{totalMetrics.totalHashRate.toFixed(1)} h/s</span></div>
              <div className="m-2">Total Ideal Read Rate : <span className="font-bold">{totalMetrics.totalIdealReadRate.toFixed(1)} MiB/s</span></div>
              <div className="m-2">Total Ideal Hash Rate : <span className="font-bold">{totalMetrics.totalIdealHashRate.toFixed(1)} h/s</span></div>
            </div>
          </div>
          {metricsData?.map((metric, index) => (
            <MetricsCard key={index} metric={metric} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
