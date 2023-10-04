import { Todo } from "@/app/api/route";
import React from "react";

const TodoList = async ({ todos }: { todos: Todo[] }) => {
  return (
    <table className="table table-auto border-solid m-5">
      <thead className="text-xl">
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody className="text-xl">
        {todos.map((todos) => (
          <tr key={todos.id}>
            <td>
              {todos.id ? (
                todos.id
              ) : (
                <div className="h-2 bg-slate-700 rounded"></div>
              )}
            </td>
            <td>
              {todos.title ? (
                todos.title
              ) : (
                <div className="h-2 bg-slate-700 rounded"></div>
              )}
            </td>
            <td>
              {todos.completed !== null ? (
                String(todos.completed)
              ) : (
                <div className="h-2 bg-slate-700 rounded"></div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
