"use client";

import { PrometheusMetrics } from "@/types";
import MetricsWithChart from "../modals/MetricsWithChart";
import { useState } from "react";

const MetricsCard = ({ metrics }: { metrics: PrometheusMetrics }) => {
  const ONE_TERABYTE = 1000000000000;
  const MODULE_MAX_SIZE = 3600000000000;

  const [showMetricsWithChart, setShowMetricsWithChart] = useState(false);

  return (
    <div>
      <div
        onClick={() => setShowMetricsWithChart(true)}
        className="w-full lg:w-[900px] border-[1px] border-slate-400 my-2 py-2 px-5 rounded-md hover:cursor-pointer hover:scale-[1.01] transition-all font-light text-sm"
      >
        <div className="flex justify-between items-start">
          <div>
            Partition{" "}
            <span className="font-semibold">
              {metrics.labels.partition_number}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>Data Size</span>
            <span className="font-semibold">
              {Number(metrics.labels.storage_module_size) / ONE_TERABYTE} TB
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span>% of Max</span>
            <span className="font-semibold">
              {(
                (Number(metrics.labels.storage_module_size) / MODULE_MAX_SIZE) *
                100
              ).toFixed(2)}{" "}
              %
            </span>
          </div>
        </div>

        <div className="flex justify-between items-start mt-6">
          <div>
            <h4 className="text-base mb-1">Read Information</h4>
            <div>
              <div>
                Current:{" "}
                <span className="font-semibold">
                  {Number(metrics.labels.read).toFixed(1)} MiB/s
                </span>
              </div>
              <div>
                Average:{" "}
                <span className="font-semibold">
                  {Number(metrics.labels.read).toFixed(1)} MiB/s
                </span>
              </div>
              <div>
                Ideal:{" "}
                <span className="font-semibold">
                  {Number(metrics.labels.ideal_read).toFixed(1)} MiB/s
                </span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-base mb-1">Hash Information</h4>
            <div>
              <div>
                Current:{" "}
                <span className="font-semibold">
                  {Number(metrics.labels.hash).toFixed(1)} h/s
                </span>
              </div>
              <div>
                Average:{" "}
                <span className="font-semibold">
                  {Number(metrics.labels.hash).toFixed(1)} h/s
                </span>
              </div>
              <div>
                Ideal:{" "}
                <span className="font-semibold">
                  {Number(metrics.labels.ideal_hash).toFixed(1)} h/s
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showMetricsWithChart && (
        <MetricsWithChart
          metrics={metrics}
          HandleCloseModal={setShowMetricsWithChart}
        />
      )}
    </div>
  );
};

export default MetricsCard;
