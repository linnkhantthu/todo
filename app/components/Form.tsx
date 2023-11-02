import React from "react";

function Form({ children, disable }: { children: any; disable: boolean }) {
  return (
    <div className="flex flex-row justify-center">
      <fieldset className="flex flex-col w-1/3" disabled={disable}>
        {children}
      </fieldset>
    </div>
  );
}

export default Form;
