"use client";

import React from "react";
import LoadingSkeletonChild from "./LoadingSkeletonChild";

function TodoCheckBox({
  id,
  completed,
}: {
  id: string;
  completed: boolean | undefined;
}) {
  const [todoCompleted, setTodoCompleted] = React.useState(completed);
  return (
    <>
      <span>
        {completed !== undefined ? (
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
