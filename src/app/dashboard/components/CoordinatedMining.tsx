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
      <div className="flex w-full flex-col items-center px-2 text-xs font-light sm:text-sm">
        {/*<div className="my-3 w-full border-b-2 border-b-gray-300 px-1 py-3 sm:w-[600px] md:w-[700px]">
          <div className="text-center text-sm sm:text-base">
            <span className="font-semibold">TOTAL</span>
          </div>
          <div className="mt-5 flex justify-between">
            <div>
              Out Batch: <span className="font-semibold">00 h/s</span>
            </div>
            <div>
              In Batch: <span className="font-semibold">00 h/s</span>
            </div>
          </div>
  </div>*/}
        {Object.keys(coordinatedMiningMetricsValue).length > 0 ? (
          Object.keys(coordinatedMiningMetricsValue).map((key: string) => (
            <div
              key={key}
              className="my-3 w-full border-b-2 border-b-gray-300 px-1 py-3 sm:w-[600px] md:w-[700px]"
            >
              <div className="text-center text-sm sm:text-base">
                Peer <span className="font-semibold">{key}</span>
              </div>
              <div className="mt-5 flex justify-between">
                <div>
                  <div>
                    H1 Out:{" "}
                    <span className="font-semibold">
                      {Number(
                        /*@ts-ignore*/
                        coordinatedMiningMetricsValue[key].h1.to,
                      ).toFixed(2)}{" "}
                      h/s
                    </span>
                  </div>
                  <div>
                    H1 In:{" "}
                    <span className="font-semibold">
                      {Number(
                        /*@ts-ignore*/
                        coordinatedMiningMetricsValue[key].h1.from,
                      ).toFixed(2)}{" "}
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
                        coordinatedMiningMetricsValue[key].h2.to,
                      ).toFixed(2)}{" "}
                    </span>
                  </div>
                  <div>
                    H2 In:{" "}
                    <span className="font-semibold">
                      {Number(
                        //@ts-ignore
                        coordinatedMiningMetricsValue[key].h2.from,
                      ).toFixed(2)}{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-[70vh] w-full items-center justify-center">
            <div className="flex h-60 flex-col items-center">
              <img
                src="/assets/logo.svg"
                alt="arweave logo"
                className="mb-4 h-20"
              />
              <p className="text-base font-semibold sm:text-lg">
                <i>This node has no peers</i>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoordinatedMiningDashBoard;
