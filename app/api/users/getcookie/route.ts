// getCookie

import { createResponse, getSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
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
