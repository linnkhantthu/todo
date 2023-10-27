import { NextRequest } from "next/server";
import { Results } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import {
  getUserByResetPasswordToken,
  updatePasswordByResetPasswordToken,
} from "@/lib/query/user/query";

// {email: string, message: Results}
// Need { token, password }
export async function POST(request: NextRequest) {
  // Declaring vars
  let email: string | undefined = undefined;
  let message = Results.REQUIRED_LOGOUT;
  let token = undefined;
  let password = undefined;

  // Create response
  const response = new Response();

  // Create session and get session user
  const session = await getSession(request, response);
  const { user: currentUser } = session;
  try {
    const { token: formToken, password: formPassword } = await request.json();
    token = formToken;
    password = formPassword;
  } catch (error: any) {
    message = Results.FAIL;
  }
  // If user is loggedout
  if (currentUser === undefined && token && password) {
    // Fetch User from DB
    const user = await getUserByResetPasswordToken(token);

    // If user exists and has a password reset token
    if (user && user.resetPasswordToken) {
      // Update the user's password with
      const updatedUser = await updatePasswordByResetPasswordToken(
        token,
        password
      );

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

getUserByResetPasswordToken()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

updatePasswordByResetPasswordToken()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
