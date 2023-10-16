import { NextRequest, NextResponse } from "next/server";
import { AuthResults, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";

// const prisma = new PrismaClient();

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

export async function POST(request: NextRequest) {
  let currentUser: User | undefined = undefined;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  // Get login data
  const loginData = await request.json();

  let message = AuthResults.INVALID;

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
