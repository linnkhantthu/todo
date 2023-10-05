"use client";

import React from "react";

function TodoTitle({ id, title }: { id: string; title: string }) {
  // useState
  const [edit, setEdit] = React.useState(false);
  const [todoTitle, setTodoTitle] = React.useState(title);

  // onClick on the title
  const handleClick = () => {
    setEdit((edit) => !edit);
  };
  return (
    <>
      {edit ? (
        <form
          key={id}
          onSubmit={(e) => {
            setEdit(false);
          }}
        >
          <input
            key={id}
            value={todoTitle}
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
          />
        </form>
      ) : (
        <span>
          {todoTitle ? (
            <span onClick={handleClick}>{todoTitle}</span>
          ) : (
            <div className="h-2 bg-slate-700 rounded"></div>
          )}
        </span>
      )}
    </>
  );
}

export default TodoTitle;
