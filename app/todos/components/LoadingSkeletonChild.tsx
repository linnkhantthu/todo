import React from "react";

function LoadingSkeletonChild() {
  return (
    <progress
      className="progress animate-pulse"
      value="100"
      max="100"
    ></progress>
  );
}

export default LoadingSkeletonChild;
