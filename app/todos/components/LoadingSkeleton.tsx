import React from "react";
import TodoList from "./TodoList";
import { Todo } from "@/app/api/route";

function LoadingSkeleton({ dataLength }: { dataLength: number }) {
  const todos: Todo[] = [];
  for (let i = 0; i < dataLength; i++) {
    todos.push({
      id: null,
      title: null,
      completed: null,
    });
  }
  return (
    <>
      <TodoList todos={todos} />
    </>
  );
}

export default LoadingSkeleton;
