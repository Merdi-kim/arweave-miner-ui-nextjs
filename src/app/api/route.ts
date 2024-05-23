import { NextResponse, NextRequest } from "next/server";
import { fetchMetrics } from "./fetchMetrics";

export async function POST(req: NextRequest) {
  const { url } = await req.json();

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
  } = await fetchMetrics(url);
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
