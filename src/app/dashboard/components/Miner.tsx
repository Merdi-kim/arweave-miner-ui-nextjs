"use client";

import { PrometheusMetrics, TotalMetrics } from "@/types";
import MetricsCard from "../components/cards/MetricsCard";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { useRecoilValue } from "recoil";
import { metrics } from "@/store";
import Graphs from "./cards/Graphs";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

const MinerDashboard = ({
  totalMetrics,
  metricsData,
}: {
  totalMetrics: TotalMetrics;
  metricsData: Array<PrometheusMetrics>;
}) => {

  return (
    <div className="h-full w-full p-4">
      {/*<h2 className="mb-10">Miner Output</h2>*/}
      <div className="w-full flex flex-col items-center">
        <div className="w-full md:w-[750px] lg:w-[900px]">
          <div className="w-full flex justify-between py-4">
            <div className="text-sm sm:text-base font-light">
              <div className="my-2">
                Total Storage :{" "}
                <span className="font-bold">
                  {Number(
                    totalMetrics.totalStorageSize / 1000000000000,
                  ).toFixed(1)}{" "}
                  TB
                </span>
              </div>
              <div className="my-2">
                Total Read Rate :{" "}
                <span className="font-bold">
                  {totalMetrics.totalReadRate.toFixed(1)} MiB/s
                </span>
              </div>
              <div className="my-2">
                Total Hash Rate :{" "}
                <span className="font-bold">
                  {totalMetrics.totalHashRate.toFixed(1)} h/s
                </span>
              </div>
              <div className="my-2">
                Total Ideal Read Rate :{" "}
                <span className="font-bold">
                  {totalMetrics.totalIdealReadRate.toFixed(1)} MiB/s
                </span>
              </div>
              <div className="mt-2">
                Total Ideal Hash Rate :{" "}
                <span className="font-bold">
                  {totalMetrics.totalIdealHashRate.toFixed(1)} h/s
                </span>
              </div>
              <div className="mt-2">
                % of Ideal Read Rate:{" "}
                <span className="font-semibold">
                  {Number((Number(totalMetrics.totalReadRate)/Number(totalMetrics.totalIdealReadRate))* 100).toFixed(1)} %
                </span>
            </div>
            <div className="mt-2">
                % of Ideal Hash Rate:{" "}
                <span className="font-semibold">
                  {Number((Number(totalMetrics.totalHashRate)/Number(totalMetrics.totalIdealHashRate))* 100).toFixed(1)} %
                </span>
            </div>
            </div>
            <div className=" flex flex-col items-center">
              <span className="text-xs font-light mb-[1px] text-gray-500">Documentation</span>
              <a href="https://docs.arweave.org/developers/mining/mining-guide" target="_blank" className="font-bold cursor-pointer">...</a>
            </div>
          </div>
          <details className="mb-4 p-4 open:border-[1px] open:border-slate-400 rounded-md"> 
            <summary className="hover:font-bold cursor-pointer">More details</summary>
            <div className="py-5 my-5 flex flex-col items-center">
              <Graphs/>
            </div>
          </details>
        </div>

        {metricsData?.map((metric, index) => (
          <MetricsCard key={index} metric={metric} />
        ))}
      </div>
    </div>
  );
};

export default MinerDashboard;
