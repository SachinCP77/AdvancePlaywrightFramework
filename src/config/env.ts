/**
 * env.ts — tiny helper for reading environment variables with a fallback.
 */

export function envOr(key: string, fallback: string): string {
    return process.env[key] ?? fallback;
}
