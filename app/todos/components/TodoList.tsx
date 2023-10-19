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
  const DeleteTodo = async (id: any) => {
    const res = await fetch("/api/todos/crud", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    const data = await res.json();
    const deletedTodo: Todo = await data?.todo;
    if (deletedTodo) {
      setTodoList(todoList.filter((value) => value.id !== id));
      return true;
    } else {
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
    const data = await res.json();
    const addedTodo: Todo = await data?.todo;

    if (addedTodo) {
      setTodoList([...todoList.reverse(), addedTodo].reverse());
      return true;
    } else {
      return false;
    }
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
        const todo: Todo | undefined = data?.todo;
        if (todo) {
          const indexToUpdate = todoList.findIndex((value) => value.id === id);
          todoList[indexToUpdate].completed = isChecked;
          setTodoList([...todoList]);
          setTimeout(() => {
            setTodoList(todoList.filter((value) => value.id !== id));
          }, 600);
        }
      });
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
          <TodoListTbody
            todoList={todoList}
            DeleteTodo={DeleteTodo}
            handleCheckBox={handleCheckBox}
          />
        </table>
      </div>
    </>
  );
};
export default TodoList;
