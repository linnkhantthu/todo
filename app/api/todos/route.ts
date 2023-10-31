import prisma from "@/db";
import { Results, Todo } from "@/lib/models";
import { getAllTodoByUsername } from "@/lib/query/todo/query";
import { isAuth } from "@/lib/utils";
import { NextRequest } from "next/server";

// {todo: Todo[], message: Results}
export async function GET(request: NextRequest) {
  let message = Results.REQUIRED_LOGIN;
  const response = new Response();
  const { isLoggedIn, currentUser } = await isAuth(request, response);
  if (isLoggedIn && currentUser) {
    const todos = await getAllTodoByUsername(currentUser.username);
    message = Results.SUCCESS;
    return Response.json({ todos: todos, message: message }, { status: 200 });
  } else {
    return Response.json({ message: message }, { status: 403 });
  }
}

getAllTodoByUsername()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
