import type { SupabaseClient } from "@supabase/supabase-js";

type RateLimitOptions = {
  keyHash: string;
  scope: "venom-ai" | "leads";
  limit: number;
  windowSeconds: number;
};

type RateLimitRow = {
  allowed: boolean;
  remaining: number;
  retry_after: number;
};

export async function consumeDistributedRateLimit(
  supabase: SupabaseClient,
  options: RateLimitOptions,
) {
  const { data, error } = await supabase.rpc("consume_rate_limit", {
    p_key_hash: options.keyHash,
    p_scope: options.scope,
    p_limit: options.limit,
    p_window_seconds: options.windowSeconds,
  });
  if (error) throw new Error("rate_limit_unavailable");
  const row = (Array.isArray(data) ? data[0] : data) as RateLimitRow | null;
  if (!row || typeof row.allowed !== "boolean") throw new Error("rate_limit_unavailable");
  return {
    allowed: row.allowed,
    remaining: Math.max(0, Number(row.remaining) || 0),
    retryAfter: Math.max(0, Number(row.retry_after) || 0),
  };
}
