import { NextResponse, type NextRequest } from "next/server";
import { localeRedirectTarget } from "@/lib/i18n/redirect";

export function proxy(request: NextRequest) {
  // Server Actions POST to the path they are used on; never redirect those.
  if (request.method !== "GET" && request.method !== "HEAD") {
    return NextResponse.next();
  }

  const target = localeRedirectTarget(
    request.nextUrl.pathname,
    request.headers.get("accept-language"),
  );

  if (!target) {
    return NextResponse.next();
  }

  // Mutating the existing URL keeps the query string; the default 307 is
  // deliberate, because a cached permanent redirect would pin a visitor to one
  // language forever.
  request.nextUrl.pathname = target;

  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals and anything with a file extension, so /favicon.ico and
  // public/ assets are served rather than redirected.
  matcher: ["/((?!_next|.*\\..*).*)"],
};
