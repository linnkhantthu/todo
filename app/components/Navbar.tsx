"use client";

import useUser from "@/lib/useUser";
import Link from "next/link";
import UserNavbar from "./UserNavbar";

function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Todo</a>
      </div>
      <div className="flex-none">{isLoggedIn ? <UserNavbar /> : ""}</div>
    </div>
  );
}

export default Navbar;
