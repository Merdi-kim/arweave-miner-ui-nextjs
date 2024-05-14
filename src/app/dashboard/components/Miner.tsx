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
  LabelItem
} from "chart.js";
import { useRecoilValue } from "recoil";
import { metrics } from "@/store";
import Graphs from "./cards/Graphs";
import { ONE_TERABYTE } from "@/utils";

Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
//Chart.register(LabelIt);

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
                    totalMetrics.totalStorageSize / ONE_TERABYTE,
                  ).toFixed(1)}{" "}
                  TiB
                </span>
              </div>
              <div className="my-2">
                Total Read Rate :{" "}
                <span className="font-bold">
                  {Number(totalMetrics.totalReadRate).toFixed(1)} MiB/s
                </span>
              </div>
              <div className="my-2">
                Total Hash Rate :{" "}
                <span className="font-bold">
                  {Number(totalMetrics.totalHashRate).toFixed(1)} h/s
                </span>
              </div>
              <div className="my-2">
                Total Ideal Read Rate :{" "}
                <span className="font-bold">
                  {Number(totalMetrics.totalIdealReadRate).toFixed(1)} MiB/s
                </span>
              </div>
              <div className="mt-2">
                Total Ideal Hash Rate :{" "}
                <span className="font-bold">
                  {Number(totalMetrics.totalIdealHashRate).toFixed(1)} h/s
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
              <a href="https://docs.arweave.org/developers/mining/mining-guide" target="_blank" className="font-bold cursor-pointer"><img src="/assets/help.svg" alt="question mark" className="h-4" /></a>
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
