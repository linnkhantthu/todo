import { Results } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let message = Results.LOGIN_FIRST;
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  if (session?.user) {
    message = Results.SUCCESS;
    await session.destroy();
  }
  return createResponse(response, JSON.stringify({ message: message }), {
    status: 200,
  });
}
