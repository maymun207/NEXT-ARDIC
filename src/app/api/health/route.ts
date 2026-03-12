/**
 * ============================================================================
 * GET /api/health — Health Check Endpoint
 * ============================================================================
 *
 * Returns server status, current timestamp, and the Git commit SHA.
 * Used by uptime monitoring tools (e.g., UptimeRobot, Pingdom) to verify
 * that API routes are responding correctly.
 *
 * Response format:
 *   { "status": "ok", "timestamp": "2026-03-05T...", "version": "abc1234" }
 * ============================================================================
 */

import { NextResponse } from "next/server";

/**
 * GET handler — returns the current server health status.
 *
 * @returns JSON response with status, timestamp, and version (Git SHA)
 */
export async function GET() {
    return NextResponse.json({
        /** Service health indicator — always "ok" if the function runs. */
        status: "ok",

        /** ISO 8601 timestamp of the response — useful for latency checks. */
        timestamp: new Date().toISOString(),

        /**
         * Git commit SHA — set by Vercel automatically as VERCEL_GIT_COMMIT_SHA.
         * Falls back to "local" for local development.
         */
        version: process.env.VERCEL_GIT_COMMIT_SHA ?? "local",
    });
}
