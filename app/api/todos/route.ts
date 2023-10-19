import prisma from "@/db";
import { AuthResults, Todo, User } from "@/lib/models";
import { getSession } from "@/lib/session";

// const prisma = new PrismaClient();

async function fetchTodos(username?: string) {
  if (username) {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user !== null) {
      const todos = await prisma.todo.findMany({
        where: {
          author: user,
        },
      });
      if (todos) {
        return todos;
      }
    }
  }
  return undefined;
}

export async function GET(request: Request) {
  let currentUser: User | undefined = undefined;
  const response = new Response();
  const session = await getSession(request, response);
  currentUser = session.user;
  const todos: Todo[] | undefined = await fetchTodos(currentUser?.username);
  if (todos) {
    return Response.json({ todos: todos });
  } else {
    return Response.json({ todos: [], message: AuthResults.INVALID });
  }
}

fetchTodos()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
