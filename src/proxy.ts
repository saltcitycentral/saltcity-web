import { NextRequest, NextResponse } from "next/server";

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let index = 0; index < a.length; index += 1) {
    result |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return result === 0;
}

export function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME ?? "";
  const password = process.env.ADMIN_PASSWORD ?? "";

  if (!username || !password) {
    return new NextResponse("Admin credentials are not configured.", { status: 500 });
  }

  const authorization = request.headers.get("authorization") ?? "";
  const [scheme, credentials] = authorization.split(" ");

  if (scheme === "Basic" && credentials) {
    try {
      const decoded = atob(credentials);
      const separator = decoded.indexOf(":");
      const suppliedUsername = decoded.slice(0, separator);
      const suppliedPassword = decoded.slice(separator + 1);

      if (
        timingSafeEqual(suppliedUsername, username) &&
        timingSafeEqual(suppliedPassword, password)
      ) {
        return NextResponse.next();
      }
    } catch {
      // Fall through to auth challenge.
    }
  }

  return new NextResponse("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Ebenezer Grant Admin"',
    },
  });
}

export const config = {
  matcher: ["/admin/ebenezer-grant/:path*", "/api/admin/ebenezer-grant/:path*"],
};
