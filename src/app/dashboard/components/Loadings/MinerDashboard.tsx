import MetricsCardLoading from "./MetricsCardLoading";

const MinerDashboardLoading = () => {
  return (
    <div className="h-full w-full">
      <div className="flex w-full flex-col items-center">
        <div className="flex h-16 w-full items-center justify-center">
          <button className="mx-4 px-1 py-1 hover:bg-gray-200">Miner</button>
          <button className="mx-4 px-1 py-1 hover:bg-gray-200">Peers</button>
        </div>
        <div className="flex w-full flex-col items-center p-4">
          <div className="w-full md:w-[750px] lg:w-[900px]">
            <div className="text-xs font-light sm:text-sm">
              <div className="mb-2 flex items-center">
                Total Storage :{" "}
                <div className="h-3 w-20 animate-pulse bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                Total Read Rate :{" "}
                <div className="h-3 w-20 animate-pulse bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                Total Hash Rate :{" "}
                <div className="h-3 w-20 animate-pulse bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                Total Ideal Read Rate :{" "}
                <div className="h-3 w-20 animate-pulse bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                Total Ideal Hash Rate :{" "}
                <div className="h-3 w-20 animate-pulse bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                % of Ideal Read Rate:{" "}
                <div className="h-3 w-20 animate-pulse bg-gray-200"></div>
              </div>
              <div className="mt-2 flex items-center">
                % of Ideal Hash Rate:{" "}
                <div className="h-3 w-20 animate-pulse bg-gray-200"></div>
              </div>
            </div>
            <details className="group mb-4 rounded-md py-2 open:mt-4 open:border-[1px] open:border-slate-400">
              <summary className="cursor-pointer hover:font-bold group-open:px-4">
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
