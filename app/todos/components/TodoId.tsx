import React from "react";
import LoadingSkeletonChild from "./LoadingSkeletonChild";

function TodoId({ id }: { id: number | null }) {
  return (
    <>
      <span>{id ? id : <LoadingSkeletonChild />}</span>
    </>
  );
}

export default TodoId;
