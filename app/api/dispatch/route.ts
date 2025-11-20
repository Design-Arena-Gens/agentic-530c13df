import { NextResponse } from 'next/server';
import { runDispatchSweep } from '@/lib/scheduler';

export async function GET() {
  const result = await runDispatchSweep();
  return NextResponse.json(result);
}
