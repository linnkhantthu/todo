"use client";

import React, { FormEvent } from "react";

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
    console.log(id);
    setEdit((edit) => !edit);
  };
  return (
    <>
      {edit ? (
        <form
          className="form form-control shadow-md"
          key={"form-" + id}
          onSubmit={updateTodoTitle}
        >
          <input
            autoFocus
            className="p-4 rounded"
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
            <div className="h-2 bg-slate-700 rounded"></div>
          )}
        </span>
      )}
    </>
  );
}

export default TodoTitle;
