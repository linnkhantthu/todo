import { NextRequest } from "next/server";
import { Messages, Results } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import EmailTemplate from "@/emails/EmailTemplate";
import {
  getUserByEmail,
  insertResetPasswordTokenByEmail,
} from "@/lib/query/user/query";
import { isAuth, sendMailWithNodemailer } from "@/lib/utils";

// {email: string, message: Results}
// { email: string }
export async function POST(request: NextRequest) {
  // Declare Var
  let message: string = Messages.REQUIRED_LOGOUT;
  let isSuccess = false;

  // Create response
  const response = new Response();

  // Create session and get User
  const { isLoggedIn } = await isAuth(request, response);
  try {
    const { email: email } = await request.json();
    if (!isLoggedIn) {
      // Get data

      // Fetch User from user
      const user = await getUserByEmail(email);

      // If User found
      if (user) {
        // Generate Token
        const { token } = await insertResetPasswordTokenByEmail(user.email);

        // If token generated
        if (token) {
          // Try to send the token as a form of react element with a Button
          try {
            const sentEmailId = await sendMailWithNodemailer(
              user.email,
              "Todo: Reset password",
              EmailTemplate({
                description: "to reset the password",
                username: user.username,
                token: token,
                host: request.headers.get("host")!,
                path: "/users/auth/forgotPassword/verify/",
                buttonValue: "Reset Password",
              })
            );
            // If the mail is successfully sent
            if (sentEmailId) {
              isSuccess = true;
              message =
                "We have sent an email to " + user.email + " successfully.";
            }
          } catch (error) {
            message = Results.SERVER_ERROR;
          }
        }
      } else {
        message = "User not found.";
      }
      return createResponse(
        response,
        JSON.stringify({
          data: { email: user?.email },
          isSuccess: isSuccess,
          message: message,
        }),
        { status: 200 }
      );
    } else {
      message = Messages.REQUIRED_LOGOUT;
      throw new Error(message);
    }
  } catch (error: any) {
    message = error.message;
    return createResponse(
      response,
      JSON.stringify({ isSuccess: isSuccess, message: message }),
      {
        status: 403,
      }
    );
  }

  // If the user is loggedout
}

getUserByEmail()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

insertResetPasswordTokenByEmail()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
