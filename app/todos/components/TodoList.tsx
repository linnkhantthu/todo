"use client";
import { Todo } from "@/app/api/route";
import React, { FormEvent, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoListTbody from "./TodoListTbody";

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
  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newTodo = formData.get("todoInput");
    if (newTodo) {
      setTodoList(
        [
          ...todoList.reverse(),
          {
            id: Math.floor(Math.random() * 10000),
            title: newTodo.toString(),
            completed: false,
          },
        ].reverse()
      );
    }
  };

  return (
    <>
      <span key="tr-newTodo">
        <AddTodo isLoading={isLoading} addTodo={addTodo} />
      </span>
      <table className="table table-auto border-solid m-5">
        <thead className="text-xl">
          <tr>
            <th></th>
            <th>Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <TodoListTbody todoList={todoList} DeleteTodo={DeleteTodo} />
      </table>
    </>
  );
};
export default TodoList;
