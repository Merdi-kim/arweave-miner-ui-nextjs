"use client";

import { MinerInfo } from "@/types";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";

interface AddMinerModalProps {
  storedMinerInfo?: MinerInfo;
  HandleCloseModal?: Dispatch<SetStateAction<boolean>>;
}

export const AddMinerModal = ({
  storedMinerInfo,
  HandleCloseModal,
}: AddMinerModalProps) => {
  const [minerInfo, setMinerInfo] = useState<MinerInfo>({
    hostname: storedMinerInfo?.hostname || "",
    protocol: storedMinerInfo?.protocol || "http",
    port: storedMinerInfo?.port || "1984",
  });

  const queryMiner = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("minerInfo", JSON.stringify(minerInfo));
    window.location.reload();
  };

  return (
    <div className="relative mx-auto w-10/12 rounded-md border bg-white p-7 shadow-lg sm:w-[32rem]">
      <form
        onSubmit={queryMiner}
        className="mx-auto flex w-full flex-col items-center justify-center sm:w-96"
      >
        <div className="w-full">
          <input
            type="text"
            className="mb-4 mt-2 w-full rounded-md border px-4 py-2 text-gray-700 invalid:border-red-500 focus:border-green-300 focus:outline-none"
            placeholder="Enter Miner Hostname or IP address"
            value={minerInfo.hostname}
            required={!!minerInfo.port.trim().length}
            onChange={(e) =>
              setMinerInfo({ ...minerInfo, hostname: e.target.value })
            }
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            className="mb-4 mt-2 w-full rounded-md border px-4 py-2 text-gray-700 focus:border-green-300 focus:outline-none"
            placeholder="Enter Miner Port Number"
            value={minerInfo.port}
            onChange={(e) =>
              setMinerInfo({ ...minerInfo, port: e.target.value })
            }
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            className="mb-4 mt-2 w-full rounded-md border px-4 py-2 text-gray-700 focus:border-green-300 focus:outline-none"
            placeholder="Enter Miner Protocol"
            value={minerInfo.protocol}
            onChange={(e) =>
              setMinerInfo({ ...minerInfo, protocol: e.target.value })
            }
          />
        </div>
        <div>
          {HandleCloseModal && (
            <button
              type="button"
              className="mr-6 rounded-md border-2 px-4 py-2 text-black hover:border-black hover:bg-gray-100"
              onClick={() => HandleCloseModal(false)}
            >
              Close
            </button>
          )}
          <button
            type="submit"
            className="rounded-md border-2 bg-black px-4 py-2 text-white hover:border-green-300 hover:text-green-300"
          >
            Add Miner
          </button>
        </div>
      </form>
    </div>
  );
};
