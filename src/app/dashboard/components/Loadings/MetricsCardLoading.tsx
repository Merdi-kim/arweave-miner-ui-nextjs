const MetricsCardLoading = () => {
  return (
    <div className="my-2  w-full rounded-md border-[1px] border-slate-400 px-5 py-2 text-xs font-light text-gray-400 transition-all hover:cursor-pointer hover:border-black sm:text-sm md:w-[750px] lg:w-[900px]">
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          Partition{" "}
          <div className="h-2 w-4 animate-pulse bg-gray-200 sm:h-4"></div>
        </div>
        <div className="flex flex-col items-center">
          <span>Data Size</span>
          <div className="h-2 w-6 animate-pulse bg-gray-200 sm:h-5"></div>
        </div>
        <div className="flex flex-col items-center">
          <span>% of Max</span>
          <div className="h-2 w-6 animate-pulse bg-gray-200 sm:h-5"></div>
        </div>
      </div>

      <div className="mt-6 flex items-start justify-between">
        <div>
          <h4 className="mb-1 text-sm sm:text-base">Read Information</h4>
          <div>
            <div className="flex items-center">
              Current:{" "}
              <div className="h-2 w-20 animate-pulse bg-gray-200 sm:h-4"></div>
            </div>
            <div className="flex items-center">
              Ideal:{" "}
              <div className="h-2 w-20 animate-pulse bg-gray-200 sm:h-4"></div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="mb-1 text-sm sm:text-base">Hash Information</h4>
          <div>
            <div className="flex items-center">
              Current:{" "}
              <div className="h-2 w-20 animate-pulse bg-gray-200 sm:h-4"></div>
            </div>
            <div className="flex items-center">
              Ideal:{" "}
              <div className="h-2 w-20 animate-pulse bg-gray-200 sm:h-4"></div>
            </div>
          </div>
        </div>
      </div>
      <details className="mt-4">
        <summary className="w-full px-3 text-center hover:font-semibold">
          More Details
        </summary>
      </details>
    </div>
  );
};

export default MetricsCardLoading;
