// Health check endpoint for Railway / uptime monitors.
// Returns 200 with build info. Does not touch the DB so it's safe to hit on every
// Railway health-check tick (default every 10s).

import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const STARTED_AT = new Date().toISOString();

export async function GET() {
  return NextResponse.json(
    {
      status: "ok",
      service: "mixology-studio",
      version: process.env.npm_package_version ?? "0.1.0",
      startedAt: STARTED_AT,
      timestamp: new Date().toISOString(),
    },
    { status: 200, headers: { "Cache-Control": "no-store" } }
  );
}
