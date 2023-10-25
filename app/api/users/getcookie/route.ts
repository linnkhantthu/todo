// getCookie

import { Results } from "@/lib/models";
import { getUserByUsername } from "@/lib/query/user/query";
import { createResponse, getSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let message = Results.FAIL;
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  const user = session.user;
  const userFromDb = await getUserByUsername(user?.username);

  if (user && userFromDb) {
    message = Results.SUCCESS;
    return createResponse(
      response,
      JSON.stringify({
        user: user,
        isLoggedIn: true,
        message: message,
      }),
      { status: 200 }
    );
  } else {
  }
  return createResponse(
    response,
    JSON.stringify({ isLoggedIn: false, message: message }),
    { status: 200 }
  );
}
