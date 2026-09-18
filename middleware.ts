import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/os", "/api/commander"];

function isProtected(pathname: string) {
  return protectedPaths.some((path) => pathname === path || pathname.startsWith(path + "/"));
}

async function digest(value: string) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function credentialsMatch(request: NextRequest, username: string, password: string) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) return false;
  try {
    const decoded = atob(authorization.slice(6));
    const separator = decoded.indexOf(":");
    if (separator < 1) return false;
    const suppliedUser = decoded.slice(0, separator);
    const suppliedPassword = decoded.slice(separator + 1);
    const [supplied, expected] = await Promise.all([
      digest(suppliedUser + "\u0000" + suppliedPassword),
      digest(username + "\u0000" + password),
    ]);
    return supplied === expected;
  } catch {
    return false;
  }
}

function sameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!host) return false;
  const protocol = request.headers.get("x-forwarded-proto") || request.nextUrl.protocol.replace(":", "");
  return origin === protocol + "://" + host;
}

export async function middleware(request: NextRequest) {
  if (!isProtected(request.nextUrl.pathname)) return NextResponse.next();
  const username = process.env.VENOM_OS_USERNAME;
  const password = process.env.VENOM_OS_PASSWORD;
  const isApi = request.nextUrl.pathname.startsWith("/api/");

  if (!username || !password) {
    if (isApi) {
      return NextResponse.json({ error: "COMMANDER indisponível." }, {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      });
    }
    return new NextResponse("Not Found", { status: 404 });
  }

  if (!(await credentialsMatch(request, username, password))) {
    return new NextResponse(isApi ? JSON.stringify({ error: "Não autorizado." }) : "Authentication required", {
      status: 401,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": isApi ? "application/json; charset=utf-8" : "text/plain; charset=utf-8",
        "WWW-Authenticate": 'Basic realm="VENOM CODE OS", charset="UTF-8"',
      },
    });
  }

  if (isApi && !sameOrigin(request)) {
    return NextResponse.json({ error: "Origem não autorizada." }, {
      status: 403,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = { matcher: ["/os/:path*", "/api/commander/:path*"] };
