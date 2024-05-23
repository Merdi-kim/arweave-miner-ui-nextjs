"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AddMinerModal } from "./modals/AddMiner";
import { MinerInfo } from "@/types";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [minerInfo, setMinerInfo] = useState<MinerInfo>();

  useEffect(() => {
    const localStorageData = localStorage.getItem("minerInfo");
    setMinerInfo(JSON.parse(localStorageData!));
  }, []);

  return (
    <header className="w-full">
      <nav className="left-0 top-0 z-20 h-14 w-full border-b border-gray-300 bg-[#F1F1F1] md:h-20">
        <div className="flex h-full items-center justify-between whitespace-nowrap px-4 md:px-10">
          <Link href="/" className="flex items-center">
            <img
              src="/assets/logo.svg"
              alt="arweave-logo"
              className="mr-2 h-8 w-8"
            />
          </Link>

          {!minerInfo?.hostname ? (
            <button
              onClick={() => setIsModalOpen((prevState) => !prevState)}
              disabled={!minerInfo?.hostname}
              className="hover:bg-gray-150 flex items-center gap-2 rounded-md border border-gray-950 px-4 py-2 font-normal text-gray-950 outline-none disabled:cursor-not-allowed"
            >
              <img src="/assets/wallet.svg" alt="wallet logo" />
              <span>Add Miner</span>
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md px-4 py-2 text-sm hover:bg-gray-200 sm:text-base"
            >{`${minerInfo?.hostname}:${minerInfo?.port}`}</button>
          )}
          {isModalOpen && (
            <div className="fixed inset-0 w-full  overflow-y-auto bg-gray-600/50 pt-40">
              <AddMinerModal
                storedMinerInfo={minerInfo!}
                HandleCloseModal={setIsModalOpen}
              />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
