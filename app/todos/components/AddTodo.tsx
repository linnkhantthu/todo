"use client";

import React, { FormEvent, useState } from "react";
const AddTodo = ({
  addTodo,
  isLoading,
}: {
  addTodo: (e: FormEvent) => Promise<boolean>;
  isLoading: boolean;
}) => {
  const [title, setTitle] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleOnSubmit = async (e: FormEvent) => {
    setIsAdding(true);
    if (await addTodo(e)) {
      setIsAdding(false);
    }
    setTitle("");
  };
  return (
    <>
      {isLoading ? (
        <div className="ml-5 w-full"></div>
      ) : (
        <form key="addTodo" className="flex flex-row" onSubmit={handleOnSubmit}>
          <input
            className="p-3 rounded w-full"
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
            {isAdding ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Add"
            )}
          </button>
        </form>
      )}
    </>
  );
};

export default AddTodo;
