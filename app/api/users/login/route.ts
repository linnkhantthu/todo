import { NextRequest } from "next/server";
import { Results } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import { getUserByUsername } from "@/lib/query/user/query";
import { HashPassword } from "@/lib/utils";

// {user: User, message: Results}
// Request { username, password }
export async function POST(request: NextRequest) {
  const hashPassword = new HashPassword();
  let message = Results.REQUIRED_LOGOUT;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  let { user: currentUser } = session;

  if (currentUser === undefined) {
    // Get login data
    const { username, password } = await request.json();
    const user = await getUserByUsername(username);
    if (user && hashPassword.decrypt(user.password) === password) {
      session.user = {
        username: user.username,
        email: user.email,
        dob: user.dob,
        verified: user.verified,
      };
      await session.save();
      currentUser = session.user;
      message = Results.SUCCESS;
    } else {
      message = Results.FAIL;
    }
    return createResponse(
      response,
      JSON.stringify({ user: currentUser, message: message }),
      { status: 200 }
    );
  }
  return createResponse(response, JSON.stringify({ message: message }), {
    status: 403,
  });
}

getUserByUsername()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
