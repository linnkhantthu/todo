import { NextRequest, NextResponse } from "next/server";
import { AuthResults, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";

// const prisma = new PrismaClient();

async function register(
  username?: string,
  email?: string,
  dob?: string,
  password?: string
) {
  if (username && email && dob && password) {
    const checkUsernameData = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    const checkEmailData = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (checkUsernameData === null && checkEmailData === null) {
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          dob: new Date(dob),
          password: password,
        },
      });
      return user as User;
    }
  }
  return undefined;
}

export async function POST(request: NextRequest) {
  let currentUser: User | undefined = undefined;
  let registeredUser: User | undefined = undefined;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  currentUser = session.user;
  let message = AuthResults.INVALID;
  if (currentUser === undefined) {
    const loginData = await request.json();
    const user = await register(
      loginData.username,
      loginData.email,
      loginData.dob,
      loginData.password
    );
    if (user) {
      message = AuthResults.REGISTERED;
      registeredUser = user;
    } else {
      message = AuthResults.REGISTERATIONFAILED;
    }
  }
  // Get login data
  return createResponse(
    response,
    JSON.stringify({
      user: registeredUser,
      message: message,
      status: 200,
    })
  );
}

register()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
