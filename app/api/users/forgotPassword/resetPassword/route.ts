import { NextRequest } from "next/server";
import { Results, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";

async function fetchUser(resetToken?: string) {
  if (resetToken) {
    const data = await prisma.user.findFirst({
      where: {
        resetPasswordToken: resetToken,
        resetPasswordTokenExpire: {
          gt: new Date(),
        },
      },
    });
    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

async function updatePassword(token?: string, password?: string) {
  if (token && password) {
    const user = await prisma.user.update({
      where: {
        resetPasswordToken: token,
        resetPasswordTokenExpire: {
          gt: new Date(),
        },
      },
      data: {
        password: password,
      },
    });
    if (user) {
      return user;
    }
  }
  return undefined;
}

// {email, message}: {email: string, message: AuthResults}
export async function POST(request: NextRequest) {
  // Declaring vars
  let currentUser: User | undefined = undefined;
  let email: string | undefined = undefined;
  let message = Results.LOGOUT_FIRST;

  // Create response
  const response = new Response();

  // Create session and get session user
  const session = await getSession(request, response);
  currentUser = session.user;

  // If user is loggedout
  if (currentUser === undefined) {
    // Get data
    const { token, password } = await request.json();

    // Fetch User from DB
    const user = await fetchUser(token);

    // If user exists and has a password reset token
    if (user !== undefined && user.resetPasswordToken) {
      // Update the user's password with
      const updatedUser = await updatePassword(token, password);

      // If the update function succeed
      if (updatedUser) {
        email = user.email;
        message = Results.SUCCESS;
      }
    } else {
      message = Results.FAIL;
    }
    return createResponse(
      response,
      JSON.stringify({
        email: email,
        message: message,
      }),
      { status: 200 }
    );
  }
  return createResponse(response, JSON.stringify({ message: message }), {
    status: 403,
  });
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

updatePassword()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
