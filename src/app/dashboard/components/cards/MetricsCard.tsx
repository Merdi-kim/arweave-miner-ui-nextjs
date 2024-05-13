"use client";

import { PrometheusMetrics } from "@/types";
import { useState } from "react";
import Graphs from "./Graphs";

const MetricsCard = ({ metric }: { metric: PrometheusMetrics }) => {
  const ONE_TERABYTE = 1000000000000;
  const MODULE_MAX_SIZE = 3600000000000;

  const [showMetricsWithChart, setShowMetricsWithChart] = useState(false);

  return (
    <div
      onClick={() => setShowMetricsWithChart(true)}
      className="w-full  md:w-[750px] lg:w-[900px] border-[1px] border-slate-400 my-2 py-2 px-5 rounded-md hover:cursor-pointer transition-all hover:border-black font-light text-xs sm:text-sm"
    >
      <div className="flex justify-between items-start">
        <div>
          Partition{" "}
          <span className="font-semibold">
            {metric.labels.partition_number}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span>Data Size</span>
          <span className="font-semibold">
            {Number(Number(metric.labels.storage_module_size) / ONE_TERABYTE).toFixed(1)} TB
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span>% of Max</span>
          <span className="font-semibold">
            {(
              (Number(metric.labels.storage_module_size) / MODULE_MAX_SIZE) *
              100
            ).toFixed(2)}{" "}
            %
          </span>
        </div>
      </div>

      <div className="flex justify-between items-start mt-6">
        <div>
          <h4 className="text-sm sm:text-base mb-1">Read Information</h4>
          <div>
            <div>
              Current:{" "}
              <span className="font-semibold">
                {Number(metric.labels.read).toFixed(1)} MiB/s
              </span>
            </div>
            {/*<div>
                Average:{" "}
                <span className="font-semibold">
                  {Number(metric.labels.read).toFixed(1)} MiB/s
                </span>
            </div>*/}
            <div>
              Ideal:{" "}
              <span className="font-semibold">
                {Number(metric.labels.ideal_read).toFixed(1)} MiB/s
              </span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm sm:text-base mb-1">Hash Information</h4>
          <div>
            <div>
              Current:{" "}
              <span className="font-semibold">
                {Number(metric.labels.hash).toFixed(1)} h/s
              </span>
            </div>
            {/*<div>
                Average:{" "}
                <span className="font-semibold">
                  {Number(metric.labels.hash).toFixed(1)} h/s
                </span>
            </div>*/}
            <div>
              Ideal:{" "}
              <span className="font-semibold">
                {Number(metric.labels.ideal_hash).toFixed(1)} h/s
              </span>
            </div>
          </div>
        </div>
      </div>
      <details className="mt-4">
        <summary className="w-full text-center px-3 hover:font-semibold">
          More Details
        </summary>
        <Graphs metric={metric} />
      </details>
    </div>
  );
};

export default MetricsCard;
