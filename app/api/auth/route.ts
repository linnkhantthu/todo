import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { AuthResults, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";

const prisma = new PrismaClient();

async function login(username?: string) {
  if (username) {
    const data = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (data !== null) {
      return data;
    }
  }
  return undefined;
}

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

  if (loginData.type === "LOGIN") {
    const user = await login(loginData.username);
    if (user !== undefined && user.password === loginData.password) {
      session.user = {
        username: user.username,
        email: user.email,
        dob: user.dob,
      };
      await session.save();
      currentUser = session.user;
      message = AuthResults.LOGGEDIN;
    } else {
      console.log("Not logged in");
      message = AuthResults.LOGINFAILED;
    }
  }

  if (loginData.type === "REGISTER") {
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
  }
  return createResponse(
    response,
    JSON.stringify({ user: currentUser, message: message, status: 200 })
  );
}

login()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

register()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
