import { Todo } from "@/app/api/route";
import React from "react";

async function Todo({ params }: { params: { id: string } }) {
  const res = await fetch("http://localhost:3000/api?id=1");
  const todo: Todo = await res.json();
  return <div>Todo - {todo.title}</div>;
}

export default Todo;
