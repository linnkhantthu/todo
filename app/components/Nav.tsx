"use client";

import UserNavbar from "./UserNavbar";

function Nav({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className="navbar bg-base-100 p-2 mt-0 fixed w-full z-10 top-0">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Todo</a>
      </div>
      <div className="flex-none">{isLoggedIn ? <UserNavbar /> : ""}</div>
    </nav>
  );
}

export default Nav;
