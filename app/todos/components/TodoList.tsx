"use client";
import { Todo } from "@/app/api/todos/route";
import React, { FormEvent } from "react";
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
      <div>
        <AddTodo isLoading={isLoading} addTodo={addTodo} />
      </div>
      <div className="flex flex-col">
        <table className="table table-auto border-solid">
          <thead className="text-xl">
            <tr>
              <th></th>
              <th>Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <TodoListTbody
            todoList={todoList}
            DeleteTodo={DeleteTodo}
            isLoading={isLoading}
            addTodo={addTodo}
          />
        </table>
      </div>
    </>
  );
};
export default TodoList;
