import { fetchMetrics } from "@/utils";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  console.log(req.body);

  const {
    totalStorageSize,
    totalReadRate,
    totalIdealReadRate,
    totalIdealHashRate,
    totalHashRate,
    minerRates,
    weaveSize,
    minerMetrics,
    coordinatedMiningData,
  } = await fetchMetrics();
  return NextResponse.json({
    totalStorageSize,
    totalReadRate,
    totalIdealReadRate,
    totalIdealHashRate,
    totalHashRate,
    minerRates,
    weaveSize,
    minerMetrics,
    coordinatedMiningData,
  });
}
