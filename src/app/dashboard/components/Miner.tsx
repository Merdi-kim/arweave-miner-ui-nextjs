import { PrometheusMetrics, TotalMetrics } from "@/types";
import MetricsCard from "../components/cards/MetricsCard";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import Graphs from "./cards/Graphs";
import { ONE_TERABYTE } from "@/utils";

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
      <div className="flex w-full flex-col items-center">
        <div className="w-full md:w-[750px] lg:w-[900px]">
          <div className="flex w-full justify-between ">
            <div className="text-xs font-light sm:text-sm">
              <div className="mb-2">
                Total Storage :{" "}
                <span className="font-bold">
                  {Number(totalMetrics.totalStorageSize / ONE_TERABYTE).toFixed(
                    2,
                  )}{" "}
                  TiB
                </span>
              </div>
              <div className="mt-2">
                Total Read Rate :{" "}
                <span className="font-bold">
                  {Number(totalMetrics.totalReadRate).toFixed(2)} MiB/s
                </span>
              </div>
              <div className="mt-2">
                Total Hash Rate :{" "}
                <span className="font-bold">
                  {Number(totalMetrics.totalHashRate).toFixed(2)} h/s
                </span>
              </div>
              <div className="mt-2">
                Total Ideal Read Rate :{" "}
                <span className="font-bold">
                  {Number(totalMetrics.totalIdealReadRate).toFixed(2)} MiB/s
                </span>
              </div>
              <div className="mt-2">
                Total Ideal Hash Rate :{" "}
                <span className="font-bold">
                  {Number(totalMetrics.totalIdealHashRate).toFixed(2)} h/s
                </span>
              </div>
              <div className="mt-2">
                % of Ideal Read Rate:{" "}
                <span className="font-semibold">
                  {Number( totalMetrics.totalIdealReadRate > 0 ?
                    (Number(totalMetrics.totalReadRate) /
                      Number(totalMetrics.totalIdealReadRate)) * 100 : 0
                  ).toFixed(2)}{" "}
                  %
                </span>
              </div>
              <div className="mt-2">
                % of Ideal Hash Rate:{" "}
                <span className="font-semibold">
                  {Number(
                    totalMetrics.totalIdealHashRate > 0 ?
                    (Number(totalMetrics.totalHashRate) /
                      Number(totalMetrics.totalIdealHashRate)) *
                      100 : 0
                  ).toFixed(2)}{" "}
                  %
                </span>
              </div>
            </div>
            <div className=" flex flex-col items-center">
              <a
                href="https://docs.arweave.org/developers/mining/mining-guide"
                target="_blank"
                className="cursor-pointer font-bold"
              >
                <img
                  src="/assets/help.svg"
                  alt="question mark"
                  className="h-3 md:h-4"
                />
              </a>
            </div>
          </div>
          <details className="group mb-4 rounded-md py-2 open:mt-4 open:border-[1px] open:border-slate-400">
            <summary className="cursor-pointer hover:font-bold group-open:px-4">
              More details
            </summary>
            <div className="my-5 flex flex-col items-center py-5">
              <Graphs />
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
