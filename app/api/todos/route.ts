import prisma from "@/db";
import { AuthResults, Todo, User } from "@/lib/models";
import { getAllTodoByUsername } from "@/lib/query/todo/query";
import { getSession } from "@/lib/session";

export async function GET(request: Request) {
  let currentUser: User | undefined = undefined;
  const response = new Response();
  const session = await getSession(request, response);
  currentUser = session.user;
  const todos: Todo[] | undefined = await getAllTodoByUsername(
    currentUser?.username
  );
  if (currentUser) {
    return Response.json({ todos: todos }, { status: 200 });
  } else {
    return Response.json(
      { todos: undefined, message: AuthResults.INVALID },
      { status: 403 }
    );
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
