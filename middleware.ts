// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "./lib/session";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getSession(req, res);
  const { user } = session;
  if (user === undefined) {
    return NextResponse.redirect(new URL("/users/auth", req.url));
  } else {
    if (!user.verified) {
      return NextResponse.redirect(new URL("/users/pleaseVerify", req.url));
    }
  }

  return res;
};

export const config = {
  matcher: "/todos/:path*",
};
