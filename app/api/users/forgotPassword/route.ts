import { NextRequest, NextResponse } from "next/server";
import { AuthResults, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";

async function fetchUser(email?: string) {
  if (email) {
    const data = await prisma.user.findFirst({
      where: {
        email: email,
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
  let isUserFound: boolean = false;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  currentUser = session.user;
  if (currentUser === undefined) {
    // Get login data
    const formData = await request.json();
    let message = AuthResults.INVALID;

    const user = await fetchUser(formData.email);
    if (user !== undefined) {
      // Generate resetPassword Token and send a mail to the client with a link
      isUserFound = true;
      message = AuthResults.USERFOUND;
    } else {
      message = AuthResults.USERNOTDOUND;
    }
    return createResponse(
      response,
      JSON.stringify({ isUserFound: isUserFound, message: message }),
      { status: 200 }
    );
  }
  return createResponse(
    response,
    JSON.stringify({ message: AuthResults.ALREADYLOGGEDIN }),
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
