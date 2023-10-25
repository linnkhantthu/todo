"use client";

import UserNavbar from "./UserNavbar";

function Nav({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Todo</a>
      </div>
      <div className="flex-none">{isLoggedIn ? <UserNavbar /> : ""}</div>
    </nav>
  );
}

export default Nav;
