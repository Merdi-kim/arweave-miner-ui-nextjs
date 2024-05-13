"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AddMinerModal } from "./modals/AddMiner";
import { MinerInfo } from "@/types";

interface NavLink {
  href: string;
  label: string;
}

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [minerInfo, setMinerInfo] = useState<MinerInfo>()

  useEffect(() => {
    const localStorageData = localStorage.getItem("minerInfo");
    setMinerInfo(JSON.parse(localStorageData!))
  }, [])

  return (
    <header className="w-full">
      <nav className="w-full h-[5rem] top-0 left-0 z-20 border-b border-gray-300 bg-[#F1F1F1]">
        <div className="flex whitespace-nowrap items-center justify-between p-4 sm:px-10">
          <Link href="/" className="flex items-center">
            <img
              src="/assets/logo.svg"
              alt="arweave-logo"
              className="w-8 h-8 mr-2"
            />
          </Link>

          {!minerInfo?.hostname ? (
            <button
              onClick={() => setIsModalOpen((prevState) => !prevState)}
              disabled={!minerInfo?.hostname}
              className="flex items-center gap-2 border border-gray-950 rounded-md px-4 py-2 font-normal outline-none text-gray-950 hover:bg-gray-150 disabled:cursor-not-allowed"
            >
              <img src="/assets/wallet.svg" />
              <span>Add Miner</span>
            </button>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              className="hover:bg-gray-200 px-4 py-2 rounded-md text-sm sm:text-base"
            >{`${minerInfo?.hostname}:${minerInfo?.port}`}</button>
          )}
          {isModalOpen && (
            <div className="fixed inset-0 pt-40  bg-gray-600/50 overflow-y-auto w-full">
              <AddMinerModal HandleCloseModal={setIsModalOpen} />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
