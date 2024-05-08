import React, { Dispatch, SetStateAction } from "react";
import { PrometheusMetrics } from "@/types";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

interface MetricsWithChartProps {
  metrics: PrometheusMetrics;
  HandleCloseModal: Dispatch<SetStateAction<boolean>>;
}

const MetricsWithChart = ({
  metrics,
  HandleCloseModal,
}: MetricsWithChartProps) => {
  const readRateDiff =
    Number(metrics.labels.ideal_read) - Number(metrics.labels.read);
  const hashRateDiff =
    Number(metrics.labels.ideal_hash) - Number(metrics.labels.hash);

  const readData = {
    labels: ["Current read", "Ideal read"],
    datasets: [
      {
        label: "Read Rate Data",
        data: [Number(metrics.labels.read).toFixed(1), readRateDiff],
        backgroundColor: ["rgb(19, 56, 17)", "rgb(188, 192, 196)"],
        hoverOffset: 4,
      },
    ],
  };

  const hashData = {
    labels: ["Current hash", "Ideal hash"],
    datasets: [
      {
        label: "Hash Rate Data",
        data: [Number(metrics.labels.hash).toFixed(1), hashRateDiff],
        backgroundColor: ["rgb(70, 70, 70)", "rgb(188, 192, 196)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="fixed inset-0 bg-gray-600/50 overflow-y-auto w-full">
      <div className="relative top-20 mx-auto p-7 border shadow-lg rounded-md bg-white w-11/12 md:w-[750px]">
        <h2 className="mb-10 text-center font-bold text-base sm:text-2xl">
          Read and Hash Rate Data
        </h2>
        <div className="flex justify-between items-start mt-6">
          <div className="text-xs sm:text-sm">
            <h4 className="text-sm sm:text-lg mb-1">Read Information</h4>
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
          <div className="text-xs sm:text-sm">
            <h4 className="text-sm sm:text-lg mb-1">Hash Information</h4>
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

        <div className="h-40 md:h-80 py-5 my-10 flex justify-between">
          <div className="">
            <h4>Read Rate</h4>
            {readRateDiff > 0 ? (
              <Doughnut data={readData} />
            ) : (
              <p className="pr-10 text-gray-400 mt-20">
                <i>Current read rate is greater than ideal read rate</i>
              </p>
            )}
          </div>

          <div>
            <h4>Hash Rate</h4>
            {hashRateDiff > 0 ? (
              <Doughnut data={hashData} />
            ) : (
              <p className="pr-10 text-gray-400 mt-20">
                <i>Current hash rate is greater than ideal hash rate</i>
              </p>
            )}
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
