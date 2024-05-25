"use client";

import React, { useEffect, useState } from "react";
import MinerDashboard from "./dashboard/components/Miner";
import CoordinatedMiningDashBoard from "./dashboard/components/CoordinatedMining";
import { MinerInfo, PrometheusMetrics, TotalMetrics } from "@/types";
import { useSetRecoilState } from "recoil";
import { coordinatedMiningMetrics, metrics } from "@/store";
import MinerDashboardLoading from "./dashboard/components/Loadings/MinerDashboard";
import NoMiner from "./dashboard/components/NoMiner";
import Error from "./dashboard/components/Error";

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
            url: `${storedMinerInfo.protocol}://${storedMinerInfo.hostname}:${storedMinerInfo.port}/metrics`,
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
          data: {
            ...minerRates,
            total: {
              totalHashRate,
              totalIdealHashRate,
              totalIdealReadRate,
              totalReadRate,
            },
          },
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
        console.log(err);
        setIsLoading(false);
        setIsError(true);
      }
    };

    if (!storedMinerInfo?.hostname) return setIsLoading(false);

    getData();
    setInterval(() => getData(), 30000);
  }, []);

  return (
    <div>
      {!minerInfo?.hostname && !isLoading && !isError && <NoMiner />}
      {minerInfo?.hostname && !isLoading && !isError && (
        <div>
          <div className="flex h-16 w-full items-center justify-center">
            <button
              onClick={() => setisMinerDashBoard(true)}
              className={`mx-4 rounded px-1 py-1 ${isMinerDashBoard ? "border-b-4 border-b-gray-400 font-medium" : "font-light"}`}
            >
              Miner
            </button>
            <button
              onClick={() => setisMinerDashBoard(false)}
              className={`mx-4 rounded px-1 py-1 ${!isMinerDashBoard ? "border-b-4 border-b-gray-400 font-medium" : "font-light"}`}
            >
              Peers
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
    </div>
  );
};

export default Dashboard;
