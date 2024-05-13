"use client";

import { PrometheusMetrics, TotalMetrics } from "@/types";
import MetricsCard from "../components/cards/MetricsCard";
import SingleDashboardLoading from "./Loadings/MinerDashboard";
import { AddMinerModal } from "./modals/AddMiner";

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
          <div className="w-full md:w-[750px] lg:w-[900px] py-4">
            <div className="justify-evenly text-sm sm:text-base font-light">
              <div className="m-2">
                Total Storage :{" "}
                <span className="font-bold">
                  {Number(
                    totalMetrics.totalStorageSize / 1000000000000,
                  ).toFixed(1)}{" "}
                  TB
                </span>
              </div>
              <div className="m-2">
                Total Read Rate :{" "}
                <span className="font-bold">
                  {totalMetrics.totalReadRate.toFixed(1)} MiB/s
                </span>
              </div>
              <div className="m-2">
                Total Hash Rate :{" "}
                <span className="font-bold">
                  {totalMetrics.totalHashRate.toFixed(1)} h/s
                </span>
              </div>
              <div className="m-2">
                Total Ideal Read Rate :{" "}
                <span className="font-bold">
                  {totalMetrics.totalIdealReadRate.toFixed(1)} MiB/s
                </span>
              </div>
              <div className="m-2">
                Total Ideal Hash Rate :{" "}
                <span className="font-bold">
                  {totalMetrics.totalIdealHashRate.toFixed(1)} h/s
                </span>
              </div>
            </div>
          </div>
          {metricsData?.map((metric, index) => (
            <MetricsCard key={index} metric={metric} />
          ))}
        </div>
      
    </div>
  );
};

export default MinerDashboard;
