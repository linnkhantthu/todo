import React from "react";
import TodoTbody from "./components/TodoTbody";

const Todos = () => {
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
          <TodoTbody />
        </tbody>
      </table>
    </>
  );
};

export default Todos;
