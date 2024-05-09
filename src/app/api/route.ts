import { fetchMetrics } from '@/utils';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(req:NextRequest) {
    const {minerRates, weaveSize, minerMetrics } = await fetchMetrics();
    return NextResponse.json({minerRates, weaveSize, minerMetrics})
}