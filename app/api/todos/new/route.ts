import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Todo, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";

const prisma = new PrismaClient();

async function addTodo(title?: string, username?: string) {
  if (title) {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user !== null) {
      const todo = prisma.todo.create({
        data: {
          title: title,
          authorId: user.id,
        },
      });
      return todo as Todo;
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
  currentUser = session.user;
  // Get login data
  const data = await request.json();

  const todo = await addTodo(data.title, currentUser?.username);
  return createResponse(
    response,
    JSON.stringify({ todo: todo, message: "message", status: 200 })
  );
}

addTodo()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
