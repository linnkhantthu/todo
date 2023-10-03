import React from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Todos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/", {
    cache: "no-cache",
  });
  const todos: Todo[] = await res.json();
  return (
    <>
      <h1>Todos</h1>
      <table className="table table-auto border-solid">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{String(todo.completed)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Todos;
