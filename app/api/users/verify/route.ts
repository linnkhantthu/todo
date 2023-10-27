import { NextRequest } from "next/server";
import { Results } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import {
  fetchUserByResetPasswordToken,
  getUserByVerifyToken,
} from "@/lib/query/user/query";

export async function POST(request: NextRequest) {
  let message = Results.FAIL;
  // Create response
  const response = new Response();
  // Get login data
  const { token } = await request.json();
  const user = await getUserByVerifyToken(token);
  if (user !== undefined) {
    message = Results.SUCCESS;
  }
  return createResponse(
    response,
    JSON.stringify({
      message: message,
    }),
    { status: 200 }
  );
}

fetchUserByResetPasswordToken()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
