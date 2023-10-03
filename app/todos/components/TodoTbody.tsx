import { Todo } from "@/app/api/route";
import React from "react";

const TodoTbody = async () => {
  const res = await fetch("http://localhost:3000/api/", {
    cache: "no-cache",
  });
  const todos: Todo[] = await res.json();
  return (
    <>
      {todos.map((todos) => (
        <tr key={todos.id}>
          <td>{todos.id}</td>
          <td>{todos.title}</td>
          <td>{String(todos.completed)}</td>
        </tr>
      ))}
    </>
  );
};

export default TodoTbody;
