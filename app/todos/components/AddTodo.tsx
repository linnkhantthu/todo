"use client";

import React, { FormEvent, useState } from "react";
import LoadingSkeletonChild from "./LoadingSkeletonChild";
import Loading from "@/app/users/components/Loading";
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
        <form
          key="addTodo"
          className="flex flex-row ml-5"
          onSubmit={handleOnSubmit}
        >
          <input
            className="p-3 rounded w-full "
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
