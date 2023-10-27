import prisma from "@/db";
import { Results, Todo } from "@/lib/models";
import { getAllTodoByUsername } from "@/lib/query/todo/query";
import { getSession } from "@/lib/session";

// {todo: Todo[], message: Results}
export async function GET(request: Request) {
  let message = Results.REQUIRED_LOGIN;
  const response = new Response();
  const session = await getSession(request, response);
  const { user: currentUser } = session;
  if (currentUser) {
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
