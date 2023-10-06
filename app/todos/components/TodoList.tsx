"use client";
import { Todo } from "@/app/api/route";
import React, { FormEvent, useEffect } from "react";
import TodoTitle from "./TodoTitle";
import TodoCheckBox from "./TodoCheckBox";
import AddTodo from "./AddTodo";

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
        <tbody className="text-xl">
          {todoList.map((_todoList, index) => (
            <tr key={"tr-" + (_todoList.id === null ? index : _todoList.id)}>
              <td>
                <TodoCheckBox
                  id={_todoList.id ? _todoList.id.toString() : ""}
                  completed={_todoList.completed}
                />
              </td>
              <td>
                <TodoTitle
                  id={_todoList.id ? _todoList.id.toString() : ""}
                  title={_todoList.title ? _todoList.title : ""}
                />
              </td>

              <td>
                <div className="text-sm">
                  {_todoList.id ? (
                    <button
                      className="btn btn-error m-1"
                      onClick={() => DeleteTodo(_todoList.id)}
                    >
                      Delete {_todoList.id}
                    </button>
                  ) : (
                    <div className="mx-5 my-1 h-2 bg-slate-700 rounded"></div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
export default TodoList;
