import { AuthResults } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  await session.destroy();
  return createResponse(
    response,
    JSON.stringify({ message: AuthResults.LOGGEDOUT, status: 200 })
  );
}
