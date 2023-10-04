import React from "react";
import TodoList from "./TodoList";

function LoadingSkeleton() {
  return (
    <>
      <TodoList todos={[]} />
      <small>Loading ... </small>
    </>
  );
}

export default LoadingSkeleton;
