"use client";

import React, { useState } from "react";
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
  const [isLoading, setIsLoading] = useState(false);

  const localhandleCheckBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    handleCheckBox(parseInt(id), e.target.checked);
    setTodoCompleted((todoCompleted) => !todoCompleted);
    setIsLoading(false);
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
            disabled={isLoading}
          />
        ) : (
          <LoadingSkeletonChild />
        )}
      </span>
    </>
  );
}

export default TodoCheckBox;
