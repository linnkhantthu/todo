import { NextRequest } from "next/server";
import { AuthResults, Results, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import { fetchUserByResetPasswordToken } from "@/lib/query/user/query";

export async function POST(request: NextRequest) {
  let message = Results.REQUIRED_LOGOUT;
  let dbToken: string | undefined = undefined;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  const { user: currentUser } = session;
  if (currentUser === undefined) {
    message = Results.FAIL;
    // Get login data
    const { token } = await request.json();

    const user = await fetchUserByResetPasswordToken(token);
    if (user !== undefined && user.resetPasswordToken) {
      dbToken = token;
      message = Results.SUCCESS;
    }
    return createResponse(
      response,
      JSON.stringify({
        token: dbToken,
        message: message,
      }),
      { status: 200 }
    );
  }
  return createResponse(response, JSON.stringify({ message: message }), {
    status: 403,
  });
}

fetchUserByResetPasswordToken()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
