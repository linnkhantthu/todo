import React, { Suspense } from "react";
import TodoList from "./components/TodoList";
import { Todo } from "../api/route";
import Loading from "./loading";

const Todos = async () => {
  const res = await fetch("http://localhost:3000/api/", {
    cache: "no-cache",
  });
  const todos: Todo[] = await res.json();
  return (
    <>
      <h1 className="m-5">Todos</h1>
      <Suspense fallback={<Loading />}>
        <TodoList todos={todos} />
      </Suspense>
    </>
  );
};

export default Todos;
