"use client";

import React, { FormEvent, useEffect, useState } from "react";
import Loading from "./loading";
import { AuthResults, Todo } from "@/lib/models";
import TodoList from "./components/TodoList";

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompletedTodos, setIsCompletedTodos] = useState(false);
  const [isTodoLoading, setIsTodoLoading] = useState(false);
  const [isConnectionFailed, setIsConnectionFailed] = useState(false);

  const DeleteTodo = async (id: any) => {
    let isSuccess: boolean = false;
    let isError: boolean = false;
    try {
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
          isSuccess = true;
        }
      }
    } catch (error) {
      isError = true;
      setIsConnectionFailed(true);
    } finally {
      return { isSuccess, isError };
    }
  };

  const addTodo = async (e: FormEvent) => {
    e.preventDefault();
    let isSuccess: boolean = false;
    let isError: boolean = false;
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const todoTitle = formData.get("todoInput")?.toString();
    const newTodo = {
      title: todoTitle,
    };
    // Adding new Todo into database
    try {
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
          isSuccess = true;
        }
      }
    } catch (error) {
      isError = true;
      setIsConnectionFailed(true);
    }
    return { isSuccess, isError };
  };
  const updateTodoTitle = async (id: number, title: string) => {
    let todo: Todo | undefined;
    try {
      await fetch("/api/todos/crud", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, title: title }),
      })
        .then((res) => res.json())
        .then((data) => {
          todo = data?.todo as Todo;
        });
    } catch (error: any) {
      todo = undefined;
      setIsConnectionFailed(true);
      console.log(error.message);
    } finally {
      return todo;
    }
  };
  const setIsInputTagsDisabled = (disabled: boolean, isChecked: boolean) => {
    const checkbox = document.getElementsByTagName("input");
    for (let index = 0; index < checkbox.length; index++) {
      if (
        checkbox[index].type === "checkbox" &&
        checkbox[index].checked === !isChecked
      ) {
        checkbox[index].disabled = disabled;
      }
    }
  };
  const handleCheckBox = async (id: number, isChecked: boolean) => {
    let isSuccess: boolean = false;
    let isError: boolean = false;
    try {
      setIsInputTagsDisabled(true, isChecked);
      await fetch("/api/todos/crud", {
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
            setIsInputTagsDisabled(false, isChecked);
            isSuccess = true;
          }
        });
      setIsInputTagsDisabled(false, isChecked);
    } catch (error) {
      isError = false;
      setIsConnectionFailed(true);
    } finally {
      return { isSuccess, isError };
    }
  };
  const handleCompletedTodos = () => {
    setIsCompletedTodos((isCompletedTodos) => !isCompletedTodos);
  };

  useEffect(() => {
    try {
      setIsTodoLoading(true);
      fetch("/api/todos")
        .then((res) => res.json())
        .then((data) => {
          const { todos }: { todos: Todo[] } = data;
          if (isCompletedTodos) {
            setTodos(todos.filter((value) => value.completed === true));
          } else {
            setTodos(todos.filter((value) => value.completed !== true));
          }
          setIsLoading(false);
          setIsTodoLoading(false);
        });
    } catch (error: any) {
      setIsConnectionFailed(true);
    }
  }, [isCompletedTodos]);
  return (
    <>
      {isConnectionFailed ? (
        AuthResults.CONNECTIONFAILED
      ) : isLoading ? (
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
            isTodoLoading={isTodoLoading}
            updateTodoTitle={updateTodoTitle}
          />
          {todos.length === 0 ? <small>No todos found.</small> : ""}
        </span>
      )}
    </>
  );
};

export default Todos;
