import { NextRequest } from "next/server";
import { Todo, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";

// const prisma = new PrismaClient();

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

async function deleteTodo(id?: number, username?: string) {
  if (id && username) {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user !== null) {
      const todo = prisma.todo.delete({
        where: {
          id: id,
          author: user,
        },
      });
      return todo as Todo;
    }
  }
  return undefined;
}

async function updateTodo(id?: number, username?: string, title?: string) {
  if (id && username) {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user !== null) {
      const todo = prisma.todo.update({
        where: {
          id: id,
          author: user,
        },
        data: {
          title: title,
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
    JSON.stringify({ todo: todo, message: "Add Todo", status: 200 })
  );
}

export async function PUT(request: NextRequest) {
  let currentUser: User | undefined = undefined;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  currentUser = session.user;
  // Get login data
  const data = await request.json();

  const todo = await updateTodo(data?.id, currentUser?.username, data?.title);
  return createResponse(
    response,
    JSON.stringify({ todo: todo, message: "Update todo", status: 200 })
  );
}

export async function DELETE(request: NextRequest) {
  let currentUser: User | undefined = undefined;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  currentUser = session.user;
  // Get login data
  const data = await request.json();

  const todo = await deleteTodo(data?.id, currentUser?.username);

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

deleteTodo()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
