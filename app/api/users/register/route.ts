import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { AuthResults, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";

const prisma = new PrismaClient();

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
      return user;
    }
  }
  return undefined;
}

export async function POST(request: NextRequest) {
  let currentUser: User | undefined = undefined;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  // Get login data
  const loginData = await request.json();

  let message = AuthResults.INVALID;

  const registerData = await register(
    loginData.username,
    loginData.email,
    loginData.dob,
    loginData.password
  );
  if (registerData) {
    message = AuthResults.REGISTERED;
  } else {
    console.log("Registeration Failed");
    message = AuthResults.REGISTERATIONFAILED;
  }
  return createResponse(
    response,
    JSON.stringify({ user: currentUser, message: message, status: 200 })
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
