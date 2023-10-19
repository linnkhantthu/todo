// getCookie

import { createResponse, getSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  const user = session.user;
  return createResponse(
    response,
    JSON.stringify({ user: user, isLoggedIn: user ? true : false }),
    { status: 200 }
  );
}
