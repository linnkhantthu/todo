"use client";

import React from "react";
import LoadingSkeletonChild from "./LoadingSkeletonChild";

function TodoCheckBox({
  id,
  completed,
  handleCheckBox,
}: {
  id: string;
  completed: boolean | undefined;
  handleCheckBox: any;
}) {
  const [todoCompleted, setTodoCompleted] = React.useState(completed);
  const localhandleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleCheckBox(parseInt(id), e.target.checked);
    setTodoCompleted((todoCompleted) => !todoCompleted);
  };
  return (
    <>
      <span>
        {completed !== undefined ? (
          <input
            className={"checkbox checkbox-success"}
            name={"checkbox-" + id}
            key={id}
            type="checkbox"
            checked={todoCompleted}
            onChange={localhandleCheckBox}
          />
        ) : (
          <LoadingSkeletonChild />
        )}
      </span>
    </>
  );
}

export default TodoCheckBox;
