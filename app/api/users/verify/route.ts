import { NextRequest } from "next/server";
import { Results, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import {
  fetchUserByResetPasswordToken,
  getUserByVerifyTokenAndVerified,
  updateVerifiedByVerifyToken,
} from "@/lib/query/user/query";

export async function POST(request: NextRequest) {
  let message = Results.FAIL;
  const response = new Response();
  const session = await getSession(request, response);
  const { token } = await request.json();
  const user = await getUserByVerifyTokenAndVerified(token, false);
  if (user) {
    const verifiedUser = await updateVerifiedByVerifyToken(token);
    if (verifiedUser) {
      if (session.user) {
        session.user = verifiedUser as User;
        await session.save();
      }
      message = Results.SUCCESS;
    }
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
