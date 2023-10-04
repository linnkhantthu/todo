import { Todo } from "@/app/api/route";
import React from "react";
import TodoList from "../components/TodoList";

async function Todo({ params }: { params: { id: string } }) {
  const res = await fetch("http://localhost:3000/api?id=" + params.id, {
    cache: "no-cache",
  });
  const todo: Todo = await res.json();
  return (
    <>
      <TodoList todos={[todo]} />
    </>
  );
}

export default Todo;
