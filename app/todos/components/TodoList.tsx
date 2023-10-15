"use client";

import React, { FormEvent } from "react";
import AddTodo from "./AddTodo";
import TodoListTbody from "./TodoListTbody";
import { Todo } from "@/lib/models";

const TodoList = ({
  todos,
  isLoading,
}: {
  todos: Todo[];
  isLoading: boolean;
}) => {
  const [todoList, setTodoList] = React.useState(
    todos.filter((value) => value.completed !== true).reverse()
  );
  // Delete Function
  const DeleteTodo = (id: any) => {
    setTodoList(todoList.filter((value) => value.id !== id));
  };

  const addTodo: (e: FormEvent) => Promise<boolean> = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const todoTitle = formData.get("todoInput")?.toString();
    const newTodo = {
      title: todoTitle,
    };
    // Adding new Todo into database
    const res = await fetch("/api/todos/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    const data = await res.json();
    const addedTodo: Todo = await data?.todo;

    if (addedTodo) {
      setTodoList([...todoList.reverse(), addedTodo].reverse());
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div>
        <AddTodo isLoading={isLoading} addTodo={addTodo} />
      </div>
      <div>
        <table className="table table-fixed border-solid w-full">
          <thead>
            <tr>
              <th className="w-3"></th>
              <th className="w-2/3">Title</th>
              <th className="float-right">Actions</th>
            </tr>
          </thead>
          <TodoListTbody todoList={todoList} DeleteTodo={DeleteTodo} />
        </table>
      </div>
    </>
  );
};
export default TodoList;
