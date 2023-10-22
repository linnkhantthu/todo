import React from "react";
function Body({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container flex flex-row justify-center w-11/12 mb-10 overflow-x-hidden">
        {children}
      </main>
    </>
  );
}

export default Body;
