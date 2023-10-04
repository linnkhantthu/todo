import { Todo } from "@/app/api/route";
import React, { Suspense } from "react";
import TodoList from "../components/TodoList";
import Loading from "../loading";
import { server } from "@/config";

async function Todo({ params }: { params: { id: string } }) {
  const res = await fetch(server+"/api?id=" + params.id, {
    cache: "no-cache",
  });
  const todo: Todo = await res.json();
  return (
    <>
      <h1 className="m-5">Todos</h1>
      <Suspense fallback={<Loading dataLength={1} />}>
        <TodoList todos={[todo]} />
      </Suspense>
    </>
  );
}

export default Todo;
