"use client";

import MetricsCardLoading from "../cards/MetricsCardLoading";

const MinerDashboardLoading = () => {
  return (
    <div className="h-full w-full">
      <div className="w-full flex flex-col items-center">
        <div className="w-full flex justify-center items-center h-20 p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-2 md:mt-0">
          <button className="block px-5 py-2 rounded hover:bg-gray-200">
            Miner
          </button>
          <button className="block px-5 py-2 rounded hover:bg-gray-200">
            Peers
          </button>
        </div>
        <div className="w-full flex flex-col items-center p-4">
          <div className="w-full md:w-[750px] lg:w-[900px] py-4">
            <div className="justify-evenly text-sm sm:text-base font-light">
              <div className="mt-2 flex items-center">
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
            <details className="mb-4 p-4 open:border-[1px] open:border-slate-400 rounded-md">
              <summary className="hover:font-bold cursor-pointer">
                More details
              </summary>
              <div className="py-5 my-5 flex flex-col items-center"></div>
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
