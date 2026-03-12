/**
 * ============================================================================
 * jest.config.ts — Jest Configuration for CompanyTech Next.js 15
 * ============================================================================
 *
 * Uses ts-jest for TypeScript transformation with Next.js path aliases.
 * Two projects: one for server-side (node) and one for client-side (jsdom).
 *
 * Coverage thresholds enforce minimum quality gates:
 *   - Statements: 60%, Branches: 60%, Functions: 70%, Lines: 60%
 * ============================================================================
 */

import type { Config } from "jest";

const config: Config = {
    /* Use ts-jest to transform TypeScript files */
    preset: "ts-jest",

    /* Default environment — use node for API routes, jsdom for components */
    testEnvironment: "node",

    /* Map @/ path alias to src/ directory (mirrors tsconfig.json paths) */
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },

    /* Coverage configuration */
    coverageThreshold: {
        global: {
            statements: 60,
            branches: 55,
            functions: 70,
            lines: 60,
        },
    },

    /* Only collect coverage from files that have corresponding tests */
    collectCoverageFrom: [
        "src/lib/roiCalculations.ts",
        "src/app/api/contact/route.ts",
    ],

    /* Transform TypeScript using ts-jest with JSX support */
    transform: {
        "^.+\\.tsx?$": [
            "ts-jest",
            {
                tsconfig: "tsconfig.json",
                jsx: "react-jsx",
            },
        ],
    },

    /* Ignore node_modules and Next.js build output */
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};

export default config;
