import { PrometheusMetrics } from "@/types";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useRecoilValue } from "recoil";
import { metrics } from "@/store";
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(Tooltip);
Chart.register(Legend);

interface GraphsProps {
  metric?: PrometheusMetrics;
}

const Graphs = ({ metric }: GraphsProps) => {
  const metricsData = useRecoilValue(metrics);

  let readRate: { labels: Array<string>; data: Array<string> } = {
    labels: [],
    data: [],
  };
  let hashRate: { labels: Array<string>; data: Array<string> } = {
    labels: [],
    data: [],
  };
  let idealReadRate: { labels: Array<string>; data: Array<string> } = {
    labels: [],
    data: [],
  };
  let idealHashRate: { labels: Array<string>; data: Array<string> } = {
    labels: [],
    data: [],
  };

  //format metrics into a format that chart.js uses for data display
  metricsData.forEach((item) => {
    readRate.labels.push(item.time);
    hashRate.labels.push(item.time);
    if (metric?.labels.partition_number) {
      readRate.data.push(item.data[metric.labels.partition_number].read);
      idealReadRate.data.push(
        item.data[metric.labels.partition_number].ideal_read,
      );
      hashRate.data.push(item.data[metric.labels.partition_number].hash);
      idealHashRate.data.push(
        item.data[metric.labels.partition_number].ideal_hash,
      );
    } else {
      readRate.data.push(item.data.total.totalReadRate);
      idealReadRate.data.push(item.data.total.totalIdealReadRate);
      hashRate.data.push(item.data.total.totalHashRate);
      idealHashRate.data.push(item.data.total.totalIdealHashRate);
    }
  });

  const avgReadRate = Number(
    readRate.data.reduce((a, b) => Number(a) + Number(b), 0) /
      Number(readRate.data.length),
  ).toFixed(1);
  const avgHashRate = Number(
    hashRate.data.reduce((a, b) => Number(a) + Number(b), 0) /
      Number(hashRate.data.length),
  ).toFixed(1);

  const readData = {
    labels: readRate.labels,
    datasets: [
      {
        data: readRate.data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        label: "Read Rate",
      },
      {
        data: idealReadRate.data,
        label: "Ideal Read Rate",
        fill: false,
        borderColor: "rgb(75, 12, 192)",
        tension: 0.1,
      },
    ],
  };

  const hashData = {
    labels: hashRate.labels,
    datasets: [
      {
        data: hashRate.data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        label: "Hash Rate",
      },
      {
        data: idealHashRate.data,
        fill: false,
        borderColor: "rgb(75, 12, 192)",
        tension: 0.1,
        label: "Ideal Hash Rate",
      },
    ],
  };

  return (
    <div className="w-[11/12] relative mx-auto p-7 sm:w-full">
      <div className="flex flex-col  items-center">
        <div>
          Average Read Rate:{" "}
          <span className="font-bold">{avgReadRate} MiB/s</span>{" "}
        </div>
        <div>
          Average Hash Rate:{" "}
          <span className="font-bold">{avgHashRate} h/s</span>{" "}
        </div>
      </div>

      <div className="py-5 my-5 hidden sm:flex flex-col items-center">
        <div className="">
          <h4>Read Rate</h4>
          <Line
            className="h-[200px] w-full"
            width={600}
            data={readData}
          />
        </div>

        <div className="mt-10">
          <h4>Hash Rate</h4>
          <Line
            className="h-[200px] w-full"
            width={600}
            data={hashData}
          />
        </div>
      </div>
    </div>
  );
};

export default Graphs;
