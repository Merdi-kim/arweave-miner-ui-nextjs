import { fetchMetrics } from "@/utils";
import MetricsCard from "./components/cards/MetricsCard";

const Dashboard = async () => {
  const { weaveSize, minerMetrics } = await fetchMetrics();
  console.log(minerMetrics);

  return (
    <div className="h-full w-full p-4">
      <div className="flex flex-col items-center">
        <h2 className="mb-10">Miner Output</h2>
      <div className="w-full flex flex-col items-center">
        {minerMetrics?.map((metric, index) => (
          <MetricsCard key={index} metrics={metric} />
        ))}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
