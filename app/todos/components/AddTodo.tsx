"use client";

import React, { FormEvent, useState } from "react";
const AddTodo = ({
  addTodo,
  isLoading,
}: {
  addTodo: any;
  isLoading: boolean;
}) => {
  const [title, setTitle] = useState("");
  const handleOnSubmit = (e: FormEvent) => {
    addTodo(e);
    setTitle("");
  };
  return (
    <>
      {isLoading ? (
        <div className="ml-5 w-full"></div>
      ) : (
        <form key="addTodo" className="flex flex-row" onSubmit={handleOnSubmit}>
          <input
            className="p-3 rounded w-10/12"
            key="addTodo"
            type="text"
            name="todoInput"
            placeholder="New todo"
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button className="btn btn-success btn-outline m-2" type="submit">
            Add
          </button>
        </form>
      )}
    </>
  );
};

export default AddTodo;
