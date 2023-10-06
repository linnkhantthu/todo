"use client";

import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { Todo } from "../api/route";
import Loading from "./loading";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data);
      });
  }, []);
  return (
    <>
      {todos.length === 0 ? (
        <Loading dataLength={200} />
      ) : (
        <>
          <h1 className="m-5">Todos</h1>
          <TodoList todos={todos} />
        </>
      )}
    </>
  );
};

export default Todos;
