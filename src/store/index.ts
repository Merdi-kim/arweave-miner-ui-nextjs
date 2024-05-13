import { atom } from "recoil";
import { PrometheusMetrics } from "@/types";

export const metrics = atom({
  key: "metrics",
  default: [] as Array<{ time: string; data: any }>,
});

export const coordinatedMiningMetrics = atom({
  key: "coordinatedMiningMetrics",
  default: {},
});
