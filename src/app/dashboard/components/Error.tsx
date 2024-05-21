"use client";

import { AddMinerModal } from "./modals/AddMiner";
import { MinerInfo } from "@/types";

const Error = ({ minerInfo }: { minerInfo: MinerInfo }) => {
  return (
    <div className="flex flex-col w-full items-center pt-32">
      <h2 className="font-semibold text-lg mb-10">Failed to fetch Metrics</h2>
      <p className="mb-10 px-10 font-light text-sm sm:text-base">
        <i>
          Check if the miner information is accurate or if the miner is active
        </i>
      </p>
      <div className="w-full">
        <AddMinerModal storedMinerInfo={minerInfo} />
      </div>
    </div>
  );
};

export default Error;
