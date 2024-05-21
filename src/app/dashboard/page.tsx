"use client";

import React, { useEffect, useState } from "react";
import MinerDashboard from "./components/Miner";
import CoordinatedMiningDashBoard from "./components/CoordinatedMining";
import { MinerInfo, PrometheusMetrics, TotalMetrics } from "@/types";
import { useSetRecoilState } from "recoil";
import { coordinatedMiningMetrics, metrics } from "@/store";
import MinerDashboardLoading from "./components/Loadings/MinerDashboard";
import NoMiner from "./components/NoMiner";
import Error from "./components/Error";

const Dashboard = () => {
  const [isMinerDashBoard, setisMinerDashBoard] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [metricsData, setMetricsData] = useState<Array<PrometheusMetrics>>([]);
  const [totalMetrics, setTotalMetrics] = useState<TotalMetrics>({
    totalStorageSize: 0,
    totalReadRate: 0,
    totalIdealReadRate: 0,
    totalIdealHashRate: 0,
    totalHashRate: 0,
  });
  const setMinerMetrics = useSetRecoilState(metrics);
  const setCoordinatedMiningMetrics = useSetRecoilState(
    coordinatedMiningMetrics,
  );
  let minerRatesOverTime: Array<{ time: string; data: any }> = [];

  const [minerInfo, setMinerInfo] = useState<MinerInfo>();

  useEffect(() => {
    const localStorageData = localStorage.getItem("minerInfo");
    const storedMinerInfo = JSON.parse(localStorageData!);
    setMinerInfo(storedMinerInfo);
    const getData = async () => {
      try {
        const data = await fetch("/api", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: `${storedMinerInfo.protocol}://${storedMinerInfo.hostname}/metrics`,
          }),
        });
        const {
          totalStorageSize,
          totalReadRate,
          totalIdealReadRate,
          totalHashRate,
          totalIdealHashRate,
          minerRates,
          weaveSize,
          minerMetrics: metricsDataFromApi,
          coordinatedMiningData,
        } = await data.json();
        const currentDate = new Date();
        const minerRateWithTimeStamp = {
          time: `${currentDate.getHours()} : ${currentDate.getMinutes()}`,
          data: minerRates,
        };
        minerRatesOverTime = [...minerRatesOverTime, minerRateWithTimeStamp];
        setMinerMetrics(minerRatesOverTime);
        setMetricsData(metricsDataFromApi);
        setCoordinatedMiningMetrics(coordinatedMiningData);
        setTotalMetrics({
          totalStorageSize,
          totalReadRate,
          totalIdealReadRate,
          totalIdealHashRate,
          totalHashRate,
        });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setIsError(true);
      }
    };

    if (!storedMinerInfo?.hostname) return setIsLoading(false);

    getData();
    setInterval(() => getData(), 30000);
  }, []);

  return (
    <main>
      {!minerInfo?.hostname && !isLoading && <NoMiner />}
      {minerInfo?.hostname && !isLoading && (
        <div>
          <div className="w-full flex justify-center items-center bg-green-600 h-5 p-4 md:p-0 mt-4 md:mt-0 rounded-lg md:flex-row md:space-x-2 ">
            <button
              onClick={() => setisMinerDashBoard(true)}
              className={`block px-5 py-2 rounded hover:bg-gray-200 ${isMinerDashBoard ? "font-medium bg-gray-500" : "font-light"}`}
            >
              Miners
            </button>
            <button
              onClick={() => setisMinerDashBoard(false)}
              className={`block px-5 py-2 rounded hover:bg-gray-200 ${!isMinerDashBoard ? "font-medium bg-gray-200" : "font-light"}`}
            >
              Peerss
            </button>
          </div>

          <div>
            {isMinerDashBoard ? (
              <MinerDashboard
                metricsData={metricsData}
                totalMetrics={totalMetrics}
              />
            ) : (
              <CoordinatedMiningDashBoard />
            )}
          </div>
        </div>
      )}
      {!isLoading && isError && <Error minerInfo={minerInfo!} />}
      {isLoading && <MinerDashboardLoading />}
    </main>
  );
};

export default Dashboard;
