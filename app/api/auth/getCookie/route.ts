// getCookie

import { createResponse, getSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();
  // if (data.passcode === process.env.COOKIE_PASSCODE) {
  //   const response = new Response();
  //   // Create session
  //   const session = await getSession(request, response);
  //   const user = session.user;
  //   return createResponse(
  //     response,
  //     JSON.stringify({ user: user, message: "", status: 200 })
  //   );
  // }

  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  const user = session.user;
  if (user) {
    return createResponse(
      response,
      JSON.stringify({ ...user, isLoggedIn: true })
    );
  } else {
    return createResponse(response, JSON.stringify({ isLoggedIn: false }));
  }
}
