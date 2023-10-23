import { NextRequest, NextResponse } from "next/server";
import { AuthResults, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";

async function fetchUser(token?: string) {
  if (token) {
    const data = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
      },
    });
    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

export async function POST(request: NextRequest) {
  let currentUser: User | undefined = undefined;
  let token: string | undefined = undefined;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  currentUser = session.user;
  if (currentUser === undefined) {
    // Get login data
    const formData = await request.json();
    let message = AuthResults.FAIL;

    const user = await fetchUser(formData.token);
    if (user !== undefined && user.resetPasswordToken) {
      token = user.resetPasswordToken;
      message = AuthResults.SUCCESS;
    }
    return createResponse(
      response,
      JSON.stringify({
        token: token,
        message: message,
      }),
      { status: 200 }
    );
  }
  return createResponse(
    response,
    JSON.stringify({ message: AuthResults.INVALID }),
    { status: 403 }
  );
}

fetchUser()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
