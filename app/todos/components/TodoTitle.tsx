"use client";

import React, { FormEvent } from "react";
import LoadingSkeletonChild from "./LoadingSkeletonChild";
import { Todo } from "@/lib/models";

function TodoTitle({ id, title }: { id: string; title: string }) {
  // useState
  const [edit, setEdit] = React.useState(false);
  const [todoTitle, setTodoTitle] = React.useState(title);

  // onClick on the title
  const enableEdit = () => {
    setEdit((edit) => !edit);
  };
  const updateTodoTitle = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/todos/crud", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: parseInt(id), title: todoTitle }),
    })
      .then((res) => res.json())
      .then((data) => {
        const todo: Todo = data?.todo;
        setTodoTitle(todo?.title ? todo.title : todoTitle);
        setEdit((edit) => !edit);
      });
  };
  return (
    <>
      {edit ? (
        <form
          name={"inputForm-" + id}
          className="form form-control"
          key={"form-" + id}
          onSubmit={updateTodoTitle}
        >
          <input
            type="text"
            name={"input-" + id}
            autoFocus
            className="p-2 rounded text-sm"
            key={"input-" + id}
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
          />
        </form>
      ) : (
        <span>
          {todoTitle ? (
            <span onClick={enableEdit}>{todoTitle}</span>
          ) : (
            <LoadingSkeletonChild />
          )}
        </span>
      )}
    </>
  );
}

export default TodoTitle;
