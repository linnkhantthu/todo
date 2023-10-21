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
  const [todoCompleted, setTodoCompleted] = useState(completed);
  const localhandleCheckBox = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTodoCompleted((todoCompleted) => !todoCompleted);
    const updated = await handleCheckBox(parseInt(id), e.target.checked);
    if (!updated) {
      setTodoCompleted((todoCompleted) => !todoCompleted);
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
          />
        ) : (
          <LoadingSkeletonChild />
        )}
      </span>
    </>
  );
}

export default TodoCheckBox;
