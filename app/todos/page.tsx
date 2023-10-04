import React, { Suspense } from "react";
import TodoList from "./components/TodoList";
import { Todo } from "../api/route";
import Loading from "./loading";
import { server } from "@/config";

const Todos = async () => {
  const res = await fetch(server+"/api/", {
    cache: "no-cache",
  });
  const todos: Todo[] = await res.json();
  return (
    <>
      <h1 className="m-5">Todos</h1>
      <Suspense fallback={<Loading dataLength={100} />}>
        <TodoList todos={todos} />
      </Suspense>
    </>
  );
};

export default Todos;
