/**
 * ============================================================================
 * i18n Dictionary Completeness Tests
 * ============================================================================
 *
 * Ensures that the English (en.json) and Turkish (tr.json) dictionary files
 * have identical structures. This catches translation drift before it
 * reaches production — missing keys would cause blank text on the site.
 *
 * Checks:
 *   1. Both files must have identical top-level keys
 *   2. All nested key paths in en.json must exist in tr.json (and vice versa)
 *   3. No key in en.json should be missing from tr.json
 *   4. No key in tr.json should be missing from en.json
 * ============================================================================
 */

import en from "@/lib/dictionaries/en.json";
import tr from "@/lib/dictionaries/tr.json";

/**
 * Recursively extracts all nested key paths from an object.
 * Example: { a: { b: 1, c: { d: 2 } } } → ["a.b", "a.c.d"]
 *
 * @param obj - The object to extract keys from
 * @param prefix - The current path prefix (used for recursion)
 * @returns Array of dot-separated key paths
 */
function getAllKeys(obj: Record<string, unknown>, prefix = ""): string[] {
    const keys: string[] = [];

    for (const key of Object.keys(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        const value = obj[key];

        if (value && typeof value === "object" && !Array.isArray(value)) {
            /* Recurse into nested objects */
            keys.push(...getAllKeys(value as Record<string, unknown>, fullKey));
        } else {
            /* Leaf node — add the full path */
            keys.push(fullKey);
        }
    }

    return keys;
}

describe("i18n dictionary completeness", () => {
    /** Both dictionaries must have identical top-level keys */
    it("en.json and tr.json have identical top-level keys", () => {
        const enTopKeys = Object.keys(en).sort();
        const trTopKeys = Object.keys(tr).sort();

        expect(enTopKeys).toEqual(trTopKeys);
    });

    /** Every nested key path in en.json must also exist in tr.json */
    it("no key in en.json is missing from tr.json", () => {
        const enKeys = getAllKeys(en as Record<string, unknown>);
        const trKeys = new Set(getAllKeys(tr as Record<string, unknown>));

        const missingInTr = enKeys.filter((k) => !trKeys.has(k));

        if (missingInTr.length > 0) {
            console.warn("Keys missing in tr.json:", missingInTr);
        }

        expect(missingInTr).toEqual([]);
    });

    /** Every nested key path in tr.json must also exist in en.json */
    it("no key in tr.json is missing from en.json", () => {
        const trKeys = getAllKeys(tr as Record<string, unknown>);
        const enKeys = new Set(getAllKeys(en as Record<string, unknown>));

        const missingInEn = trKeys.filter((k) => !enKeys.has(k));

        if (missingInEn.length > 0) {
            console.warn("Keys missing in en.json:", missingInEn);
        }

        expect(missingInEn).toEqual([]);
    });

    /** Both dictionaries must have the same total number of leaf keys */
    it("both dictionaries have the same number of keys", () => {
        const enCount = getAllKeys(en as Record<string, unknown>).length;
        const trCount = getAllKeys(tr as Record<string, unknown>).length;

        expect(enCount).toBe(trCount);
    });
});
