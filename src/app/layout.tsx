"use client";

import { Roboto_Mono } from "next/font/google";
import "./globals.css";
import { RecoilRoot } from "recoil";
import Navbar from "./dashboard/components/Navbar";

const roboto = Roboto_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Arweave Miner Metrics</title>
        <link rel="icon" href="/assets/favicon.ico" sizes="any" />
        <meta
          name="description"
          content="Dashboard for displaying important Arweave miner metrics"
        />
        
      </head>
      <body suppressHydrationWarning className={roboto.className}>
        <Navbar />
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
