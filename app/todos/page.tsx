import React from "react";
import TodoList from "./components/TodoList";
import { Todo } from "../api/route";

const Todos = async () => {
  const res = await fetch("http://localhost:3000/api/", {
    cache: "no-cache",
  });
  const todos: Todo[] = await res.json();
  return (
    <>
      <h1>Todos</h1>
      <TodoList todos={todos} />
    </>
  );
};

export default Todos;
