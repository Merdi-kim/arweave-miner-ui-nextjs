"use client";

import { MinerInfo } from "@/types";
import {
  Dispatch,
  SetStateAction,
  useActionState,
  useEffect,
  useState,
} from "react";

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

  useEffect(() => {
    const localStorageData = localStorage.getItem("minerInfo");
    //setStoredMinerInfo(JSON.parse(localStorageData!));
  }, []);

  const queryMiner = () => {
    localStorage.setItem("minerInfo", JSON.stringify(minerInfo));
    window.location.reload();
  };

  return (
    <div className="relative mx-auto p-7 border shadow-lg rounded-md bg-white w-10/12 sm:w-[32rem]">
      <div className="mx-auto flex flex-col items-center justify-center w-full sm:w-96">
        {/*<div className="w-full">
            <input
              type="text"
              className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
              placeholder="Give your miner a name"
            />
  </div>*/}
        <div className="w-full">
          <input
            type="text"
            className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300 invalid:border-red-500"
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
            className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
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
            className="mt-2 mb-4 px-4 py-2 w-full border rounded-md text-gray-700 focus:outline-none focus:border-green-300"
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
              className="px-4 py-2 mr-6 text-black rounded-md hover:bg-gray-100 hover:border-black border-2"
              onClick={() => HandleCloseModal(false)}
            >
              Close
            </button>
          )}
          <button
            onClick={queryMiner}
            className="px-4 py-2 bg-black text-white rounded-md hover:text-green-300 hover:border-green-300 border-2"
          >
            Add Miner
          </button>
        </div>
      </div>
    </div>
  );
};
