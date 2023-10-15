"use client";

import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import Loading from "./loading";
import { Todo } from "@/lib/models";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);
  return (
    <>
      {todos.length === 0 ? (
        <Loading dataLength={100} />
      ) : (
        <span className="m-1">
          <TodoList isLoading={false} todos={todos} />
        </span>
      )}
    </>
  );
};

export default Todos;
