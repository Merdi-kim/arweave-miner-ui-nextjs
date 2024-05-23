import { AddMinerModal } from "./modals/AddMiner";
import { MinerInfo } from "@/types";

const Error = ({ minerInfo }: { minerInfo: MinerInfo }) => {
  return (
    <div className="flex w-full flex-col items-center pt-32">
      <h2 className="mb-10 text-lg font-semibold">Failed to fetch Metrics</h2>
      <p className="mb-10 px-10 text-sm font-light sm:text-base">
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
