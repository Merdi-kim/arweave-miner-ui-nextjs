"use client";

import { coordinatedMiningMetrics } from "@/store";
import React from "react";
import { useRecoilValue } from "recoil";

const CoordinatedMiningDashBoard = () => {
  const coordinatedMiningMetricsValue = useRecoilValue(
    coordinatedMiningMetrics,
  );

  return (
    <div className="w-full">
      <div className="w-full flex flex-col items-center font-light text-xs sm:text-sm px-2">
        {Object.keys(coordinatedMiningMetricsValue).map((key: string) =>
          key == "total" ? (
            <div
              key={key}
              className="w-full sm:w-[600px] md:w-[700px] p-4 rounded-md border-b-2 shadow-sm border-b-gray-300 my-3"
            >
              <div className="text-center text-sm sm:text-base">
                <span className="font-semibold">{key.toUpperCase()}</span>
              </div>
              <div className="flex justify-between mt-5">
                <div>
                  Out Batch:{" "}
                  <span className="font-semibold">
                    {/* @ts-ignore */}
                    {Number(coordinatedMiningMetricsValue[key].h1.from).toFixed(
                      1,
                    )}{" "}
                    h/s
                  </span>
                </div>
                <div>
                  In Batch:{" "}
                  <span className="font-semibold">
                    {/* @ts-ignore */}
                    {Number(coordinatedMiningMetricsValue[key].h1.to).toFixed(
                      1,
                    )}{" "}
                    h/s
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={key}
              className="w-full sm:w-[600px] md:w-[700px] p-4 rounded-md border-b-2 shadow-sm border-b-gray-300 my-3"
            >
              <div className="text-center text-sm sm:text-base">
                Peer <span className="font-semibold">{key}</span>
              </div>
              <div className="flex justify-between mt-5">
                <div>
                  <div>
                    H1 Out:{" "}
                    <span className="font-semibold">
                      {Number(
                        /*@ts-ignore*/
                        coordinatedMiningMetricsValue[key].h1.from,
                      ).toFixed(1)}{" "}
                      h/s
                    </span>
                  </div>
                  <div>
                    H1 In:{" "}
                    <span className="font-semibold">
                      {Number(
                        /*@ts-ignore*/
                        coordinatedMiningMetricsValue[key].h1.to,
                      ).toFixed(1)}{" "}
                      h/s
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    H2 Out:{" "}
                    <span className="font-semibold">
                      {Number(
                        //@ts-ignore
                        coordinatedMiningMetricsValue[key].h2.from,
                      ).toFixed(1)}{" "}
                      h/s
                    </span>
                  </div>
                  <div>
                    H2 In:{" "}
                    <span className="font-semibold">
                      {Number(
                        //@ts-ignore
                        coordinatedMiningMetricsValue[key].h2.to,
                      ).toFixed(1)}{" "}
                      h/s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default CoordinatedMiningDashBoard;