import React, { Dispatch, SetStateAction, useState } from "react";
import { PrometheusMetrics } from "@/types";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement } from "chart.js";
import { useRecoilValue } from "recoil";
import { metrics } from "@/store";
Chart.register(CategoryScale)
Chart.register(LinearScale)
Chart.register(PointElement)
Chart.register(LineElement)

interface MetricsWithChartProps {
  metric: PrometheusMetrics;
  HandleCloseModal: Dispatch<SetStateAction<boolean>>;
}

const MetricsWithChart = ({metric, HandleCloseModal}: MetricsWithChartProps) => {
  //const [readRate, setReadRate] = useState([])
  //const [hashRate, setHashRate] = useState([])
  const metricsData = useRecoilValue(metrics)

  let rRate:{labels:Array<string>, data:Array<string>} = {labels:[], data:[]}
  let hRate:{labels:Array<string>, data:Array<string>} = {labels:[], data:[]}

  metricsData.forEach(item => {
    rRate.labels.push(item.time)
    rRate.data.push(item.data[metric.labels.partition_number].read)
    hRate.labels.push(item.time)
    hRate.data.push(item.data[metric.labels.partition_number].hash)
  })

  const avgRrate = Number(rRate.data.reduce((a,b) => Number(a) + Number(b),0)/Number(rRate.data.length)).toFixed(1)
  const avgHrate = Number(hRate.data.reduce((a,b) => Number(a) + Number(b),0)/Number(rRate.data.length)).toFixed(1)

  const readData = {
    labels:rRate.labels,
    datasets: [{
      data: rRate.data,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const hashData = {
    labels:hRate.labels,
    datasets: [{
      data: hRate.data,
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };


  return (
    <div className="fixed inset-0 bg-gray-600/50 overflow-y-auto w-full">
      <div className="relative top-5 mx-auto p-7 border shadow-lg rounded-md bg-white w-11/12 md:w-[750px]">
        <h2 className="mb-5 text-center font-bold text-base sm:text-2xl">
          Read and Hash Rate Data
        </h2>
        <div className="flex flex-col items-center">
          <div>Average Read Rate: {avgRrate} MiB/s</div>
          <div>Average Hash Rate: {avgHrate} h/s</div>
        </div>
        {/*<div className="flex justify-between items-start mt-6">
          <div className="text-xs sm:text-sm">
            <h4 className="text-sm sm:text-lg mb-1">Read Information</h4>
            <div>
              <div>
                Current:{" "}
                <span className="font-semibold">
                  {Number(metric.labels.read).toFixed(1)} MiB/s
                </span>
              </div>
              <div>
                Average:{" "}
                <span className="font-semibold">
                  {Number(metric.labels.read).toFixed(1)} MiB/s
                </span>
              </div>
              <div>
                Ideal:{" "}
                <span className="font-semibold">
                  {Number(metric.labels.ideal_read).toFixed(1)} MiB/s
                </span>
              </div>
            </div>
          </div>
          <div className="text-xs sm:text-sm">
            <h4 className="text-sm sm:text-lg mb-1">Hash Information</h4>
            <div>
              <div>
                Current:{" "}
                <span className="font-semibold">
                  {Number(metric.labels.hash).toFixed(1)} h/s
                </span>
              </div>
              <div>
                Average:{" "}
                <span className="font-semibold">
                  {Number(metric.labels.hash).toFixed(1)} h/s
                </span>
              </div>
              <div>
                Ideal:{" "}
                <span className="font-semibold">
                  {Number(metric.labels.ideal_hash).toFixed(1)} h/s
                </span>
              </div>
            </div>
          </div>
  </div>*/}

        <div className="py-5 my-5 flex flex-col items-center">
          <div className="h-60">
            <h4>Read Rate</h4>
            <Line data={readData}/>
          </div>

          <div className="h-60 mt-10">
            <h4>Hash Rate</h4>
              <Line data={hashData}/>
          </div>
          </div>

        <div className="flex justify-center">
          <button
            className="px-4 py-2 mr-6 text-black rounded-md hover:bg-gray-100 hover:border-black border-2"
            onClick={() => HandleCloseModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MetricsWithChart;
