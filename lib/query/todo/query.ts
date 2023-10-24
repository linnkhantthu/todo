import prisma from "@/db";
import { Todo } from "@/lib/models";

export async function getAllTodoByUsername(username?: string) {
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
export async function insertTodo(title?: string, username?: string) {
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

export async function updateTodo(
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

export async function deleteTodo(id?: number, username?: string) {
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
