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

  if (currentUser && dbUser && currentUser.sessionId === dbUser.sessionId) {
    session.user = {
      username: dbUser.username,
      email: dbUser.email,
      dob: dbUser.dob,
      verified: dbUser.verified,
      sessionId: dbUser.sessionId,
    };
    await session.save();
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
    await session.destroy();
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
