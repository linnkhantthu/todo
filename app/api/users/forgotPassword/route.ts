import { NextRequest, NextResponse } from "next/server";
import { AuthResults, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import { Resend } from "resend";
import ForgotPasswordEmailTemplate from "@/app/users/components/ForgotPasswordEmailTemplate";
import { generateToken, getExpireDate } from "@/lib/utils";

const resend = new Resend(process.env.RESEND_API_KEY);

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

async function insertToken(email?: string) {
  let token: string | undefined = undefined;
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
  return { token };
}

export async function POST(request: NextRequest) {
  let currentUser: User | undefined = undefined;
  let isUserFound: boolean = false;
  let email: string | undefined = undefined;
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
      email = user.email;
      const { token } = await insertToken(email);
      if (email && token) {
        try {
          const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: [email],
            subject: "Todo: Reset password",
            react: ForgotPasswordEmailTemplate({
              username: user.username,
              token: token,
            }),
          });
          isUserFound = true;
          if (data.id) {
            message = AuthResults.SUCCESS;
          }
        } catch (error) {
          email = undefined;
          message = AuthResults.INVALID;
        }
      }
    } else {
      email = undefined;
      message = AuthResults.FAIL;
    }
    return createResponse(
      response,
      JSON.stringify({
        isUserFound: isUserFound,
        email: email,
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
