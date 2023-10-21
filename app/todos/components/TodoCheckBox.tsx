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
  handleCheckBox: (id: number, isChecked: boolean) => Promise<boolean>;
}) {
  const [todoCompleted, setTodoCompleted] = React.useState(completed);
  const [isLoading, setIsLoading] = useState(false);

  const localhandleCheckBox = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    const updated = await handleCheckBox(parseInt(id), e.target.checked);
    if (updated) {
      setTodoCompleted((todoCompleted) => !todoCompleted);
      setIsLoading(false);
    }
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
