import { NextRequest } from "next/server";
import { Results } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import EmailTemplate from "@/emails/EmailTemplate";
import {
  getUserByEmail,
  insertVerifyTokenByEmail,
} from "@/lib/query/user/query";
import { isAuth, sendMailWithNodemailer } from "@/lib/utils";

// {email: string, message: Results}
// { email: string }
export async function POST(request: NextRequest) {
  // Declare Var
  let message = "";
  let isSuccess = false;

  // Create response
  const response = new Response();

  // Create session and get User
  const { isLoggedIn, currentUser } = await isAuth(request, response);

  // If the user is loggedout
  if (isLoggedIn && currentUser) {
    const { token } = await insertVerifyTokenByEmail(currentUser.email);
    if (token) {
      try {
        // const sentEmailId = await sendMail(
        //   user.email,
        //   "Todo: Verify your email",
        //   EmailTemplate({
        //     description: "to complete verification",
        //     username: user.username,
        //     token: token,
        //     path: "/users/verify/",
        //     buttonValue: "Verify",
        //   })
        // );
        const sentEmailId = await sendMailWithNodemailer(
          currentUser.email,
          "Todo: Verify your email",
          EmailTemplate({
            description: "to complete verification",
            username: currentUser.username,
            token: token,
            host: request.headers.get("host")!,
            path: "/users/verify/",
            buttonValue: "Verify",
          })
        );
        if (sentEmailId) {
          isSuccess = true;
          message =
            "We have sent a verification token to " +
            currentUser.email +
            "successfully";
        }
      } catch (error: any) {
        isSuccess = false;
        message = "Failed to send an email to " + currentUser.email + ".";
      }
    }
    return createResponse(
      response,
      JSON.stringify({
        data: { email: currentUser.email },
        isSuccess: isSuccess,
        message: message,
      }),
      { status: 200 }
    );
  }
  return createResponse(
    response,
    JSON.stringify({ isSuccess: isSuccess, message: "Unauthorised Request" }),
    {
      status: 403,
    }
  );
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
