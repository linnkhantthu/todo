"use client";

import React from "react";
import LoadingSkeletonChild from "./LoadingSkeletonChild";

function TodoCheckBox({
  id,
  completed,
}: {
  id: string;
  completed: boolean | null;
}) {
  const [todoCompleted, setTodoCompleted] = React.useState(completed);
  return (
    <>
      <span>
        {completed !== null ? (
          <input
            name={"checkbox-" + id}
            key={id}
            type="checkbox"
            checked={todoCompleted == undefined ? undefined : todoCompleted}
            onChange={(e) => {
              setTodoCompleted((todoCompleted) => !todoCompleted);
            }}
          />
        ) : (
          <LoadingSkeletonChild />
        )}
      </span>
    </>
  );
}

export default TodoCheckBox;
