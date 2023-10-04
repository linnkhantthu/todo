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
            <td>{todos.id}</td>
            <td>{todos.title}</td>
            <td>{String(todos.completed)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;
