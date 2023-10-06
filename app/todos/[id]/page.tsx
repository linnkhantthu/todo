"use client";

import { Todo } from "@/app/api/route";
import React, { useEffect, useState } from "react";
import TodoList from "../components/TodoList";
import Loading from "../loading";

function SingleTodo({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<Todo>();
  useEffect(() => {
    fetch("/api/?id=" + params.id)
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
