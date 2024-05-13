"use client";

const MetricsCardLoading = () => {
  return (
    <div className="w-full  md:w-[750px] lg:w-[900px] border-[1px] text-gray-400 border-slate-400 my-2 py-2 px-5 rounded-md hover:cursor-pointer transition-all hover:border-black font-light text-xs sm:text-sm">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          Partition{" "}
          <div className="animate-pulse w-4 h-2 sm:h-4 bg-gray-200"></div>
        </div>
        <div className="flex flex-col items-center">
          <span>Data Size</span>
          <div className="animate-pulse w-6 h-2 sm:h-5 bg-gray-200"></div>
        </div>
        <div className="flex flex-col items-center">
          <span>% of Max</span>
          <div className="animate-pulse w-6 h-2 sm:h-5 bg-gray-200"></div>
        </div>
      </div>

      <div className="flex justify-between items-start mt-6">
        <div>
          <h4 className="text-sm sm:text-base mb-1">Read Information</h4>
          <div>
            <div className="flex items-center">
              Current:{" "}
              <div className="animate-pulse w-20 h-2 sm:h-4 bg-gray-200"></div>
            </div>
            <div className="flex items-center">
              Ideal:{" "}
              <div className="animate-pulse w-20 h-2 sm:h-4 bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="text-sm sm:text-base mb-1">Hash Information</h4>
          <div>
            <div className="flex items-center">
              Current:{" "}
              <div className="animate-pulse w-20 h-2 sm:h-4 bg-gray-200"></div>
            </div>
            <div className="flex items-center">
              Ideal:{" "}
              <div className="animate-pulse w-20 h-2 sm:h-4 bg-gray-200"></div>
            </div>
          </div>
        </div>
      </div>
      <details className="mt-4">
        <summary className="w-full text-center px-3 hover:font-semibold">
          More Details
        </summary>
      </details>
    </div>
  );
};

export default MetricsCardLoading;
