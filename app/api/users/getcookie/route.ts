// getCookie

import prisma from "@/db";
import { Results } from "@/lib/models";
import { getUserByUsername } from "@/lib/query/user/query";
import { createResponse, getSession } from "@/lib/session";
import { NextRequest } from "next/server";

// {user: User, isLoggedIn: boolean, message: Results}
// Req: {}
export async function GET(request: NextRequest) {
  let message = Results.SUCCESS;
  let isLoggedIn = false;
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  const { user: currentUser } = session;
  const dbUser = await getUserByUsername(currentUser?.username);

  if (currentUser && dbUser) {
    isLoggedIn = true;
    return createResponse(
      response,
      JSON.stringify({
        user: currentUser,
        isLoggedIn: isLoggedIn,
        message: message,
      }),
      { status: 200 }
    );
  } else {
    return createResponse(
      response,
      JSON.stringify({ isLoggedIn: isLoggedIn, message: message }),
      { status: 200 }
    );
  }
}
getUserByUsername()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
