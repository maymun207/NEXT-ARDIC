/**
 * Google Drive Knowledge Loader for Company Agent
 *
 * Reads .md and .pdf files from a shared Drive folder and extracts their text.
 * Results are cached for 5 minutes to avoid hammering the Drive API on every chat message.
 *
 * Setup:
 * 1. Put your service account JSON at src/ai/google-service-account.json
 * 2. Set GOOGLE_DRIVE_FOLDER_ID in .env.local
 * 3. Share your Drive folder with the service account email
 */

import { google } from "googleapis";
import { join } from "path";
import { existsSync, readFileSync } from "fs";
import { extractText, getDocumentProxy } from "unpdf";

/* ── Cache: avoid fetching from Drive on every message ── */
interface CacheEntry {
    content: string;
    fetchedAt: number;
}
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let cache: CacheEntry | null = null;

/* ── Auth: load service account credentials ─────────── */
function getAuth() {
    let keyFile: { client_email: string; private_key: string };

    // 1. Production (Vercel): read from environment variable
    if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
        keyFile = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
        console.log("[Drive] Using service account from env var.");
    } else {
        // 2. Development: look for any .json file in src/ai/
        const aiDir = join(process.cwd(), "src", "ai");
        let keyPath = join(aiDir, "google-service-account.json");
        if (!existsSync(keyPath)) {
            const { readdirSync } = require("fs") as typeof import("fs");
            const jsonFiles = readdirSync(aiDir).filter(
                (f: string) => f.endsWith(".json") && f !== "tsconfig.json"
            );
            if (jsonFiles.length > 0) {
                keyPath = join(aiDir, jsonFiles[0]);
                console.log(`[Drive] Using service account: ${jsonFiles[0]}`);
            } else {
                throw new Error("No service account JSON found. Set GOOGLE_SERVICE_ACCOUNT_JSON env var or place a key file in src/ai/");
            }
        }
        keyFile = JSON.parse(readFileSync(keyPath, "utf-8"));
    }

    return new google.auth.JWT({
        email: keyFile.client_email,
        key: keyFile.private_key,
        scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
}

/* ── Main: load all files from Drive folder ─────────── */
export async function loadGoogleDriveKnowledge(): Promise<string> {
    // Return cached result if fresh
    if (cache && Date.now() - cache.fetchedAt < CACHE_TTL) {
        return cache.content;
    }

    const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
        console.warn("[Drive] GOOGLE_DRIVE_FOLDER_ID not set — skipping Drive knowledge.");
        return "";
    }

    try {
        const auth = getAuth();
        const drive = google.drive({ version: "v3", auth });

        // List all files in the folder
        const listRes = await drive.files.list({
            q: `'${folderId}' in parents and trashed = false`,
            fields: "files(id, name, mimeType)",
            pageSize: 50,
        });

        const files = listRes.data.files ?? [];
        if (files.length === 0) {
            console.log("[Drive] No files found in folder.");
            return "";
        }

        const sections: string[] = [];

        for (const file of files) {
            if (!file.id || !file.name) continue;

            const name = file.name;
            const mimeType = file.mimeType ?? "";

            try {
                // Google Docs → export as plain text
                if (mimeType === "application/vnd.google-apps.document") {
                    const res = await drive.files.export(
                        { fileId: file.id, mimeType: "text/plain" },
                        { responseType: "text" }
                    );
                    const text = (res.data as string).trim();
                    sections.push(`## [Drive Doc: ${name}]\n\n${text}`);
                    console.log(`[Drive] Loaded Google Doc: ${name}`);
                }
                // Markdown files → download as text
                else if (name.endsWith(".md") || mimeType === "text/plain" || mimeType === "text/markdown") {
                    const res = await drive.files.get(
                        { fileId: file.id, alt: "media" },
                        { responseType: "text" }
                    );
                    const text = (res.data as string).trim();
                    sections.push(`## [Drive File: ${name}]\n\n${text}`);
                    console.log(`[Drive] Loaded text file: ${name}`);
                }
                // PDF files → parse with unpdf
                else if (mimeType === "application/pdf" || name.endsWith(".pdf")) {
                    const res = await drive.files.get(
                        { fileId: file.id, alt: "media" },
                        { responseType: "arraybuffer" }
                    );
                    const uint8 = new Uint8Array(res.data as ArrayBuffer);
                    const doc = await getDocumentProxy(uint8);
                    const { text } = await extractText(doc, { mergePages: true });
                    const extracted = text.trim().slice(0, 50_000); // 50k char limit
                    sections.push(`## [Drive PDF: ${name}]\n\n${extracted}`);
                    console.log(`[Drive] Loaded PDF: ${name} (${extracted.length} chars)`);
                }
                else {
                    console.log(`[Drive] Skipping unsupported file: ${name} (${mimeType})`);
                }
            } catch (fileErr) {
                console.warn(`[Drive] Could not load file "${name}":`, fileErr);
            }
        }

        const content = sections.join("\n\n---\n\n");

        // Update cache
        cache = { content, fetchedAt: Date.now() };
        console.log(`[Drive] Loaded ${sections.length} file(s) from Drive folder.`);

        return content;
    } catch (err) {
        console.error("[Drive] Failed to load from Google Drive:", err);
        return ""; // Graceful fallback — agent continues without Drive content
    }
}

/* ── Utility: clear cache (for testing) ────────────── */
export function clearDriveCache() {
    cache = null;
}
