import { NextRequest } from "next/server";
import { AuthResults, Results, Todo, User } from "@/lib/models";
import { createResponse, getSession } from "@/lib/session";
import prisma from "@/db";
import {
  deleteTodoById,
  insertTodoByUsername,
  updateTodoByIdAndUsername,
} from "@/lib/query/todo/query";

// Add Todo if method: POST {todo, message}: {todo: Todo, message: Results}
// Need { title }
export async function POST(request: NextRequest) {
  // Declaring currentUser
  let message = Results.LOGIN_FIRST;

  // Create response
  const response = new Response();

  // Create session
  const session = await getSession(request, response);
  const { user: currentUser } = session;

  if (currentUser) {
    // Get data
    const { title } = await request.json();

    // Call Function
    const todo = await insertTodoByUsername(title, currentUser.username);
    message = todo ? Results.SUCCESS : Results.FAIL;
    return createResponse(
      response,
      JSON.stringify({ todo: todo, message: message }),
      {
        status: 200,
      }
    );
  }
  return createResponse(
    response,
    JSON.stringify({
      message: Results.LOGIN_FIRST,
    }),
    { status: 403 }
  );
}

// Update Todo if method: PUT {todo, message}: {todo: Todo, message: Results}
// Need { id, title, completed }
export async function PUT(request: NextRequest) {
  let message = Results.LOGIN_FIRST;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  const { user: currentUser } = session;
  // Get data
  if (currentUser) {
    const { id, title, completed } = await request.json();
    const todo = await updateTodoByIdAndUsername(
      id,
      currentUser?.username,
      title,
      completed
    );
    message = todo ? Results.SUCCESS : Results.FAIL;
    return createResponse(
      response,
      JSON.stringify({ todo: todo, message: message }),
      {
        status: 200,
      }
    );
  }
  return createResponse(
    response,
    JSON.stringify({
      message: message,
    }),
    { status: 403 }
  );
}

// Delete Todo if method: DELETE {todo, message}: {todo: Todo, message: Results}
// Need { id }
export async function DELETE(request: NextRequest) {
  let message = Results.LOGIN_FIRST;
  // Create response
  const response = new Response();
  // Create session
  const session = await getSession(request, response);
  const { user: currentUser } = session;
  // Get data
  if (currentUser) {
    const { id } = await request.json();
    const todo = await deleteTodoById(id, currentUser?.username);
    message = todo ? Results.SUCCESS : Results.FAIL;
    return createResponse(
      response,
      JSON.stringify({ todo: todo, message: message }),
      {
        status: 200,
      }
    );
  }
  return createResponse(
    response,
    JSON.stringify({
      message: message,
    }),
    { status: 403 }
  );
}

insertTodoByUsername()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

updateTodoByIdAndUsername()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

deleteTodoById()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
