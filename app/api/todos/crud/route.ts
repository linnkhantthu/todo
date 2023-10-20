import { NextRequest } from "next/server";
import { AuthResults, Todo, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";

// Add Todo Function
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

// Update Todo Function
async function updateTodo(
  id?: number,
  username?: string,
  title?: string,
  completed?: boolean
) {
  if (id && username) {
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (user !== null) {
      let todo: Todo | undefined;
      if (title) {
        todo = prisma.todo.update({
          where: {
            id: id,
            author: user,
          },
          data: {
            title: title,
          },
        });
      }
      if (completed !== undefined) {
        todo = prisma.todo.update({
          where: {
            id: id,
            author: user,
          },
          data: {
            completed: completed,
          },
        });
      }
      return todo as Todo;
    }
  }
  return undefined;
}

// Delete Todo Function
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

// Add Todo if method: POST
export async function POST(request: NextRequest) {
  // Declaring currentUser
  let currentUser: User | undefined = undefined;

  // Create response
  const response = new Response();

  // Create session
  const session = await getSession(request, response);
  currentUser = session.user;

  if (currentUser) {
    // Get login data
    const data = await request.json();

    // Call Function
    const todo = await addTodo(data.title, currentUser?.username);

    return createResponse(response, JSON.stringify({ todo: todo }), {
      status: 200,
    });
  }
  return createResponse(
    response,
    JSON.stringify({
      todo: undefined,
      message: AuthResults.INVALID,
    }),
    { status: 403 }
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
  if (currentUser) {
    let todo: Todo | undefined;
    const { id, title, completed } = await request.json();
    todo = await updateTodo(id, currentUser?.username, title, completed);
    return createResponse(response, JSON.stringify({ todo: todo }), {
      status: 200,
    });
  }
  return createResponse(
    response,
    JSON.stringify({
      todo: undefined,
      message: AuthResults.INVALID,
    }),
    { status: 403 }
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
  if (currentUser) {
    const data = await request.json();

    const todo = await deleteTodo(data?.id, currentUser?.username);

    return createResponse(response, JSON.stringify({ todo: todo }), {
      status: 200,
    });
  }
  return createResponse(
    response,
    JSON.stringify({
      todo: undefined,
      message: AuthResults.INVALID,
    }),
    { status: 403 }
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
