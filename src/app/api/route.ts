import { fetchMetrics } from '@/utils';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req:NextRequest) {
    const {totalStorageSize, totalReadRate, totalIdealReadRate, totalIdealHashRate, totalHashRate, minerRates, weaveSize, minerMetrics } = await fetchMetrics();
    return NextResponse.json({totalStorageSize, totalReadRate, totalIdealReadRate, totalIdealHashRate, totalHashRate, minerRates, weaveSize, minerMetrics})
}