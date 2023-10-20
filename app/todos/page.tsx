"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Loading from "./loading";
import { Todo } from "@/lib/models";
import TodoList from "./components/TodoList";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompletedTodos, setIsCompletedTodos] = useState(false);

  const DeleteTodo = async (id: any) => {
    const res = await fetch("/api/todos/crud", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    if (res.ok) {
      const data = await res.json();
      const deletedTodo: Todo = await data?.todo;
      if (deletedTodo) {
        setTodos(todos.filter((value) => value.id !== id));
        return true;
      }
      return false;
    }
  };

  const addTodo: (e: FormEvent) => Promise<boolean> = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const todoTitle = formData.get("todoInput")?.toString();
    const newTodo = {
      title: todoTitle,
    };
    // Adding new Todo into database
    const res = await fetch("/api/todos/crud", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    if (res.ok) {
      const data = await res.json();
      const addedTodo: Todo = await data?.todo;
      if (addedTodo) {
        setTodos([...todos.reverse(), addedTodo].reverse());
        return true;
      }
    }
    return false;
  };

  const handleCheckBox = (id: number, isChecked: boolean) => {
    fetch("/api/todos/crud", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, completed: isChecked }),
    })
      .then((res) => res.json())
      .then((data) => {
        const { todo }: { todo: Todo | undefined } = data;
        if (todo) {
          const indexToUpdate = todos.findIndex((value) => value.id === id);
          todos[indexToUpdate].completed = isChecked;
          setTodos([...todos]);
          setTimeout(() => {
            setTodos(todos.filter((value) => value.id !== id));
          }, 50);
        }
      });
  };
  const handleCompletedTodos = () => {
    setIsCompletedTodos((isCompletedTodos) => !isCompletedTodos);
  };

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => {
        const { todos }: { todos: Todo[] } = data;
        // setIsLoading(true);
        if (isCompletedTodos) {
          setTodos(todos.filter((value) => value.completed === true).reverse());
        } else {
          setTodos(todos.filter((value) => value.completed !== true).reverse());
        }
        setIsLoading(false);
      });
  }, [isCompletedTodos]);
  return (
    <>
      {isLoading ? (
        <Loading dataLength={100} />
      ) : (
        <span className="m-1">
          <TodoList
            isLoading={isLoading}
            todos={todos}
            handleCompletedTodos={handleCompletedTodos}
            isCompletedTodos={isCompletedTodos}
            addTodo={addTodo}
            DeleteTodo={DeleteTodo}
            handleCheckBox={handleCheckBox}
          />
          {todos.length === 0 ? <small>No todos found.</small> : ""}
        </span>
      )}
    </>
  );
};

export default Todos;
