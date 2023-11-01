import React from "react";

function Form({ children }: any) {
  return (
    <div className="flex flex-row justify-center">
      <fieldset className="flex flex-col w-1/3">{children}</fieldset>
    </div>
  );
}

export default Form;
