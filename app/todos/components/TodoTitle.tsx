"use client";

import React, { FormEvent } from "react";
import LoadingSkeletonChild from "./LoadingSkeletonChild";
import { Todo } from "@/lib/models";

function TodoTitle({
  id,
  title,
  updateTodoTitle,
}: {
  id: string;
  title: string;
  updateTodoTitle: (id: number, title: string) => Promise<Todo | undefined>;
}) {
  // useState
  const [edit, setEdit] = React.useState(false);
  const [todoTitle, setTodoTitle] = React.useState(title);

  // onClick on the title
  const enableEdit = () => {
    setEdit((edit) => !edit);
  };
  const updateTodoTitleLocal = async (e: FormEvent) => {
    e.preventDefault();
    const todo = await updateTodoTitle(parseInt(id), todoTitle);
    console.log(todo);
    if (todo !== undefined) {
      setTodoTitle(todo?.title ? todo.title : todoTitle);
    }
    setEdit((edit) => !edit);
  };
  return (
    <>
      {edit ? (
        <form
          name={"inputForm-" + id}
          className="form form-control"
          key={"form-" + id}
          onSubmit={updateTodoTitleLocal}
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
