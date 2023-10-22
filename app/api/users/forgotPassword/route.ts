import { NextRequest, NextResponse } from "next/server";
import { AuthResults, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import { Resend } from "resend";
import ForgotPasswordEmailTemplate from "@/app/users/components/ForgotPasswordEmailTemplate";

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
      try {
        email = user.email;
        const data = await resend.emails.send({
          from: "onboarding@resend.dev",
          to: email,
          subject: "Todo: Reset password",
          react: ForgotPasswordEmailTemplate({
            username: user.username,
            token: "",
          }),
        });
        isUserFound = true;
        message = AuthResults.USERFOUND;
      } catch (error) {
        email = undefined;
        message = AuthResults.INVALID;
      }
      // Generate resetPassword Token and send a mail to the client with a link
    } else {
      email = undefined;
      message = AuthResults.USERNOTDOUND;
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
