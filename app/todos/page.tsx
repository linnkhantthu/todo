import React from "react";
import TodoTbody from "./components/TodoTbody";

const Todos = () => {
  return (
    <>
      <h1>Todos</h1>
      <table className="table table-auto border-solid">
        <thead className="text-xl">
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody className="text-xl">
          <TodoTbody />
        </tbody>
      </table>
    </>
  );
};

export default Todos;
