'use client'
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { AddMinerModal } from "./modals/AddMiner";

interface NavLink {
  href: string;
  label: string;
}

export default function Navbar() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false)

  const links: NavLink[] = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    }
  ];

  const NavLink = ({ href, label }: NavLink) => {
    return (
      <Link
        href={href}
        className={`block px-5 py-2 rounded hover:bg-gray-200 ${
          usePathname() == href ? "font-medium bg-gray-200" : "font-light"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="w-full">
      <nav className="fixed w-full z-20 top-0 left-0 border-b border-gray-300 bg-[#F1F1F1]">
        <div className="flex whitespace-nowrap items-center justify-between p-4 px-10">
          <Link href="/" className="flex items-center">
            <img src='/assets/logo.svg' alt="arweave-logo" className="w-8 h-8 mr-2" />
          </Link>

          <div className="items-center justify-between hidden w-full md:flex md:w-auto">
            <ul className="flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-2 md:mt-0">
              {links.map((link, index) => {
                return (
                  <NavLink key={index} href={link.href} label={link.label}/>
                );
              })}
            </ul>
          </div>

          <button
            onClick={() => setIsModalOpen(prevState => !prevState)}
            disabled={isModalOpen}
            className="flex items-center gap-2 border border-gray-950 rounded-md px-4 py-2 font-normal outline-none text-gray-950 hover:bg-gray-150 disabled:cursor-not-allowed"
          >
            <img src="/assets/wallet.svg"/><span>Add Miner</span>
          </button>
          {isModalOpen && <AddMinerModal HandleCloseModal = {setIsModalOpen}/>}
        </div>
      </nav>
    </header>
  );
}
