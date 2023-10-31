// getCookie

import prisma from "@/db";
import { Results } from "@/lib/models";
import { getUserByUsername } from "@/lib/query/user/query";
import { createResponse, getSession } from "@/lib/session";
import { isAuth } from "@/lib/utils";
import { NextRequest } from "next/server";

// {user: User, isLoggedIn: boolean, message: Results}
// Req: {}
export async function GET(request: NextRequest) {
  let message = Results.SUCCESS;
  const response = new Response();

  const { isLoggedIn, currentUser } = await isAuth(request, response);
  return createResponse(
    response,
    JSON.stringify({
      user: currentUser,
      isLoggedIn: isLoggedIn,
      message: message,
    }),
    { status: 200 }
  );
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
