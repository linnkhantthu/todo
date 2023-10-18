import React from "react";
import Navbar from "./Navbar";

function Body({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <main className="container flex flex-row justify-center w-11/12 h-screen">
        {children}
      </main>
    </>
  );
}

export default Body;
