import { NextRequest, NextResponse } from "next/server";
import { AuthResults, User } from "@/lib/models";
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
  return undefined;
}

export async function POST(request: NextRequest) {
  let currentUser: User | undefined = undefined;
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
    console.log(formData?.token);
    const user = await fetchUser(formData.token);
    if (user !== undefined && user.resetPasswordToken) {
      const updatedUser = await updatePassword(
        user.resetPasswordToken,
        formData?.password
      );
      if (updatedUser) {
        email = user.email;
        message = AuthResults.SUCCESS;
      }
    } else {
      message = AuthResults.FAIL;
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
