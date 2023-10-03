import React from "react";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoTbody = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/", {
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
