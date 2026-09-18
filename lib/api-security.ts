export type JsonReadResult =
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413 | 415; error: string };

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");
  if (!host) return false;
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const protocol = forwardedProto || new URL(request.url).protocol.replace(":", "");
  return origin === protocol + "://" + host;
}

export function clientAddress(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

export async function readJsonBody(request: Request, maxBytes: number): Promise<JsonReadResult> {
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return { ok: false, status: 415, error: "Envie os dados em JSON." };
  }
  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false, status: 413, error: "Conteúdo muito grande." };
  }
  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > maxBytes) {
    return { ok: false, status: 413, error: "Conteúdo muito grande." };
  }
  try {
    return { ok: true, value: JSON.parse(rawBody) };
  } catch {
    return { ok: false, status: 400, error: "JSON inválido." };
  }
}
