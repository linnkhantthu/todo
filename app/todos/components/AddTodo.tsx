"use client";

import React, { useState } from "react";
import Loading from "../loading";
import LoadingSkeletonChild from "./LoadingSkeletonChild";

const AddTodo = ({
  addTodo,
  isLoading,
}: {
  addTodo: any;
  isLoading: boolean;
}) => {
  const [title, setTitle] = useState("");
  return (
    <>
      {isLoading ? (
        ""
      ) : (
        <form key="addTodo" className="flex" onSubmit={addTodo}>
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
            Add
          </button>
        </form>
      )}
    </>
  );
};

export default AddTodo;
