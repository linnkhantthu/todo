"use client";

import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import Loading from "../loading";
import { Todo } from "@/lib/models";

function SingleTodo({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<Todo>();
  useEffect(() => {
    fetch("/api/todos/?id=" + params.id)
      .then((res) => res.json())
      .then((data) => {
        setTodo(data);
      });
  }, []);
  return (
    <>
      {todo === undefined ? (
        <Loading dataLength={1} />
      ) : (
        <>
          <h1 className="m-5">Todos</h1>
          <TodoList isLoading={false} todos={[todo]} />
        </>
      )}
    </>
  );
}

export default SingleTodo;
