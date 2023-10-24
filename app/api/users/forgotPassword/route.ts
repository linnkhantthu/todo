import { NextRequest, NextResponse } from "next/server";
import { AuthResults, Results, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import { Resend } from "resend";
import ForgotPasswordEmailTemplate from "@/app/users/components/ForgotPasswordEmailTemplate";
import { generateToken, getExpireDate } from "@/lib/utils";
import { getUserByEmail } from "@/lib/query/user/query";

// Init Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Fetch User from db with email

// Generate Token
async function insertToken(email?: string) {
  let token: string | undefined = undefined;
  if (email) {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        resetPasswordToken: generateToken(),
        resetPasswordTokenExpire: getExpireDate(),
      },
    });
    if (user && user.resetPasswordToken) {
      token = user.resetPasswordToken;
    }
  }
  return { token };
}

// {}
export async function POST(request: NextRequest) {
  // Declare Var
  let currentUser: User | undefined = undefined;
  let isUserFound: boolean = false;
  let dbEmail: string | undefined = undefined;
  let message = Results.LOGOUT_FIRST;

  // Create response
  const response = new Response();

  // Create session and get User
  const session = await getSession(request, response);
  currentUser = session.user;

  // If the user is loggedout
  if (currentUser === undefined) {
    // Get data
    const { email } = await request.json();

    // Fetch User from user
    const user = await getUserByEmail(email);

    // If User found
    if (user !== undefined) {
      dbEmail = user.email;
      isUserFound = true;

      // Generate Token
      const { token } = await insertToken(dbEmail);

      // If token generated
      if (dbEmail && token) {
        // Try to send the token as a form of react element with a Button
        try {
          const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [dbEmail],
            subject: "Todo: Reset password",
            react: ForgotPasswordEmailTemplate({
              username: user.username,
              token: token,
            }),
          });
          // If the mail is successfully sent
          if (data.id) {
            message = Results.SUCCESS;
          }
        } catch (error) {
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
        isUserFound: isUserFound,
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
insertToken()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
