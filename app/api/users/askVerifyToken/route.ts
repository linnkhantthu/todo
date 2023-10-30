import { NextRequest } from "next/server";
import { Results } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import EmailTemplate from "@/emails/EmailTemplate";
import {
  getUserByEmail,
  insertVerifyTokenByEmail,
} from "@/lib/query/user/query";
import { sendMailWithNodemailer } from "@/lib/utils";

// {email: string, message: Results}
// { email: string }
export async function POST(request: NextRequest) {
  // Declare Var
  let message = Results.REQUIRED_LOGOUT;

  // Create response
  const response = new Response();

  // Create session and get User
  const session = await getSession(request, response);
  const { user: currentUser } = session;

  // If the user is loggedout
  if (currentUser) {
    let dbEmail: string | undefined = undefined;
    // Get data
    const { email } = await request.json();

    // Fetch User from user
    const user = await getUserByEmail(email);

    // If User found
    if (user !== undefined) {
      dbEmail = user.email;

      // Generate Token
      const { token } = await insertVerifyTokenByEmail(dbEmail);

      // If token generated
      if (dbEmail && token) {
        // Try to send the token as a form of react element with a Button
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
            user.email,
            "Todo: Verify your email",
            EmailTemplate({
              description: "to complete verification",
              username: user.username,
              token: token,
              path: "/users/verify/",
              buttonValue: "Verify",
            })
          );
          // If the mail is successfully sent
          if (sentEmailId) {
            message = Results.SUCCESS;
          }
        } catch (error: any) {
          console.log(error.message);
          dbEmail = undefined;
          message = Results.SERVER_ERROR;
        }
      }
    } else {
      dbEmail = undefined;
      message = Results.FAIL;
    }
    return createResponse(
      response,
      JSON.stringify({
        email: dbEmail,
        message: message,
      }),
      { status: 200 }
    );
  }
  return createResponse(response, JSON.stringify({ message: message }), {
    status: 403,
  });
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
