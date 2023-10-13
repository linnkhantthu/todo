import React from "react";

function Loading() {
  return (
    <div className="flex flex-col justify-center">
      <span className=" flex flex-row justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </span>
    </div>
  );
}

export default Loading;
