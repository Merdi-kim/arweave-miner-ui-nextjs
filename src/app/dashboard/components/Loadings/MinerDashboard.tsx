"use client";

import MetricsCardLoading from "../cards/MetricsCardLoading";

const MinerDashboardLoading = () => {
  return (
    <div className="h-full w-full">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-center items-center h-16">
          <button className="px-1 mx-4 py-1 hover:bg-gray-200">
            Miner
          </button>
          <button className="px-1 mx-4 py-1 hover:bg-gray-200">
            Peers
          </button>
        </div>
        <div className="w-full flex flex-col items-center p-4">
          <div className="w-full md:w-[750px] lg:w-[900px]">
            <div className="text-xs sm:text-sm font-light">
              <div className="mb-2 flex items-center">
                Total Storage :{" "}
                <div className="animate-pulse w-20 h-3 bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                Total Read Rate :{" "}
                <div className="animate-pulse w-20 h-3 bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                Total Hash Rate :{" "}
                <div className="animate-pulse w-20 h-3 bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                Total Ideal Read Rate :{" "}
                <div className="animate-pulse w-20 h-3 bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                Total Ideal Hash Rate :{" "}
                <div className="animate-pulse w-20 h-3 bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                % of Ideal Read Rate:{" "}
                <div className="animate-pulse w-20 h-3 bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                % of Ideal Hash Rate:{" "}
                <div className="animate-pulse w-20 h-3 bg-gray-200"></div>
              </div>
            </div>
            <details className="mb-4 py-2 group open:border-[1px] open:border-slate-400 open:mt-4 rounded-md">
            <summary className="hover:font-bold cursor-pointer group-open:px-4">
              More details
            </summary>
          </details>
          </div>
          <MetricsCardLoading />
          <MetricsCardLoading />
          <MetricsCardLoading />
          <div className="hidden 2xl:block">
            <MetricsCardLoading />
            <MetricsCardLoading />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinerDashboardLoading;
