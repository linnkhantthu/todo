import { Todo } from "@/app/api/route";
import Link from "next/link";
import React from "react";
import TodoTitle from "./TodoTitle";

const TodoList = async ({ todos }: { todos: Todo[] }) => {
  return (
    <table className="table table-auto border-solid m-5">
      <thead className="text-xl">
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody className="text-xl">
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>
              <span>
                {todo.id ? (
                  todo.id
                ) : (
                  <div className="h-2 bg-slate-700 rounded"></div>
                )}
              </span>
            </td>
            <td>
              <TodoTitle title={todo.title ? todo.title : ""} />
            </td>
            <td>
              {todo.completed !== null ? (
                String(todo.completed)
              ) : (
                <div className="h-2 bg-slate-700 rounded"></div>
              )}
            </td>
            <td>
              <div className="text-sm">
                {todo.id ? (
                  <button className="btn btn-info m-1">
                    <Link
                      href={
                        "/todos/" + (todo.id !== null ? todo.id.toString() : "")
                      }
                    >
                      Edit
                    </Link>
                  </button>
                ) : (
                  <div className="mx-5 my-1 h-2 bg-slate-700 rounded"></div>
                )}
                {todo.id ? (
                  <button className="btn btn-error m-1">
                    <Link
                      href={
                        "/todos/" + (todo.id !== null ? todo.id.toString() : "")
                      }
                    >
                      Delete
                    </Link>
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
