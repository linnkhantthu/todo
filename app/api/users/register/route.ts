import { NextRequest } from "next/server";
import { Results, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import { insertUser } from "@/lib/query/user/query";

export async function POST(request: NextRequest) {
  let message = Results.LOGOUT_FIRST;
  let user: User | undefined = undefined;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  const { user: currentUser } = session;

  if (currentUser === undefined) {
    const { username, email, dob, password } = await request.json();
    user = await insertUser(username, email, dob, password);
    message = user ? Results.SUCCESS : Results.FAIL;
  }
  return createResponse(
    response,
    JSON.stringify({
      user: user,
      message: message,
    }),
    { status: 200 }
  );
}

insertUser()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
