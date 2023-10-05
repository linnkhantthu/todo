"use client";
import { Todo } from "@/app/api/route";
import React from "react";
import TodoTitle from "./TodoTitle";
import TodoCheckBox from "./TodoCheckBox";

const TodoList = ({ todos }: { todos: Todo[] }) => {
  const [todoList, setTodoList] = React.useState(todos);

  // Delete Function
  const DeleteTodo = (_todoList: Todo) => {
    setTodoList(todoList.filter((value) => value.id !== _todoList.id));
  };

  return (
    <table className="table table-auto border-solid m-5">
      <thead className="text-xl">
        <tr>
          <th></th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="text-xl">
        {todoList.map((_todoList) => (
          <tr key={_todoList.id}>
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
                    onClick={() => DeleteTodo(_todoList)}
                  >
                    Delete
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
  );
};
export default TodoList;
