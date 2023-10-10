// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { User } from "@/lib/models";
import { getIronSession } from "iron-session";

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSession {
    [x: string]: any;
    user?: User;
  }
}

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "session",
    password: "vFG6GEZfmFqiWEvA1MFLyR3q7qdkx0k1",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

  // do anything with session here:
  const { user } = session;

  // like mutate user:
  //   user.username = "linnkhantthu";
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();
  // console.log(user);
  // demo:
  if (user === undefined) {
    // unauthorized to see pages inside admin/
    // return NextResponse.redirect(new URL("/users/auth", req.url)); // redirect to /unauthorized page
    return NextResponse.redirect(new URL("/users/auth", req.url));
  }

  return res;
};

export const config = {
  matcher: "/todos/:path*",
};
