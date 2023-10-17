"use client";

import React, { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import Loading from "./loading";
import { Todo } from "@/lib/models";
import Navbar from "./components/Navbar";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        setTodos(data?.todos);
        setIsLoading(false);
      });
  }, []);
  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading dataLength={100} />
      ) : (
        <span className="m-1">
          <TodoList isLoading={false} todos={todos} />
          {todos.length === 0 ? <small>No todos found.</small> : ""}
        </span>
      )}
    </>
  );
};

export default Todos;
