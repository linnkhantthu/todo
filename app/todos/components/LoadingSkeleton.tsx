import React from "react";
import TodoList from "./TodoList";
import { Todo } from "@/lib/models";

function LoadingSkeleton({ dataLength }: { dataLength: number }) {
  const todos: Todo[] = [];
  for (let i = 0; i < dataLength; i++) {
    todos.push({
      title: undefined,
    });
  }
  return (
    <>
      <TodoList isLoading={true} todos={todos} />
    </>
  );
}

export default LoadingSkeleton;
