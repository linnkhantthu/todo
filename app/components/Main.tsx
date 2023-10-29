import React from "react";
function Main({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="container flex flex-row w-11/12 mt-16 mb-10 overflow-x-hidden">
        {children}
      </main>
    </>
  );
}

export default Main;
