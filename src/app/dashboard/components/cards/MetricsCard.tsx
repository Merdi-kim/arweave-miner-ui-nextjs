import { PrometheusMetrics } from "@/types";
import Graphs from "./Graphs";
import { ONE_TERABYTE } from "@/utils";

const MetricsCard = ({ metric }: { metric: PrometheusMetrics }) => {
  const MODULE_MAX_SIZE = 3.6 * ONE_TERABYTE;

  return (
    <div className="my-2  w-full rounded-md border-[1px] border-gray-300 px-5 py-2 text-xs font-light transition-all hover:cursor-pointer hover:border-black sm:text-sm md:w-[750px] lg:w-[900px]">
      <div className="flex items-start justify-between">
        <div>
          Partition{" "}
          <span className="font-semibold">
            {metric.labels.partition_number}
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span>Data Size</span>
          <span className="font-semibold">
            {Number(
              Number(metric.value) / ONE_TERABYTE,
            ).toFixed(2)}{" "}
            TiB
          </span>
        </div>
        <div className="flex flex-col items-center">
          <span>% of Max</span>
          <span className="font-semibold">
            {(
              (Number(metric.value) / MODULE_MAX_SIZE) *
              100
            ).toFixed(2)}{" "}
            %
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-start justify-between">
        <div>
          <h4 className="mb-1 text-sm sm:text-base">Read Information</h4>
          <div>
            <div>
              Current:{" "}
              <span className="font-semibold">
                {Number(metric.labels.read).toFixed(2)} MiB/s
              </span>
            </div>
            <div>
              Ideal:{" "}
              <span className="font-semibold">
                {Number(metric.labels.ideal_read).toFixed(2)} MiB/s
              </span>
            </div>
            <div>
              % of Ideal:{" "}
              <span className="font-semibold">
                {Number(
                  (Number(metric.labels.read) /
                    Number(metric.labels.ideal_read)) *
                    100,
                ).toFixed(2)}{" "}
                %
              </span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-1 text-sm sm:text-base">Hash Information</h4>
          <div>
            <div>
              Current:{" "}
              <span className="font-semibold">
                {Number(metric.labels.hash).toFixed(2)} h/s
              </span>
            </div>
            <div>
              Ideal:{" "}
              <span className="font-semibold">
                {Number(metric.labels.ideal_hash).toFixed(2)} h/s
              </span>
            </div>
            <div>
              % of Ideal:{" "}
              <span className="font-semibold">
                {Number(
                  (Number(metric.labels.hash) /
                    Number(metric.labels.ideal_hash)) *
                    100,
                ).toFixed(2)}{" "}
                %
              </span>
            </div>
          </div>
        </div>
      </div>
      <details className="mt-4">
        <summary className="w-full px-3 text-center hover:font-semibold">
          More Details
        </summary>
        <Graphs metric={metric} />
      </details>
    </div>
  );
};

export default MetricsCard;
