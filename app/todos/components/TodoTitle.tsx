"use client";

import React from "react";

function TodoTitle({ title }: { title: string }) {
  const [edit, setEdit] = React.useState(false);
  const handleClick = () => {
    setEdit((edit) => !edit);
  };
  return (
    <>
      {edit ? (
        <input type="text" value={title} />
      ) : (
        <span>
          {title ? (
            <span onClick={handleClick}>{title}</span>
          ) : (
            <div className="h-2 bg-slate-700 rounded"></div>
          )}
        </span>
      )}
    </>
  );
}

export default TodoTitle;
