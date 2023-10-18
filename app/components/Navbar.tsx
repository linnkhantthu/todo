"use client";

import useUser from "@/lib/useUser";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function Navbar() {
  const { user, isLoading, isError } = useUser();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Todo</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          {isLoading || isError ? (
            <span className="loading loading-dots loading-sm"></span>
          ) : user ? (
            <li>
              <details>
                <summary>
                  <div>{user.username}</div>
                </summary>
                <ul className="p-2 bg-base-100">
                  <li>
                    <a>Account</a>
                  </li>
                  <li>
                    <a className="ml-5" href="/users/auth/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </details>
            </li>
          ) : (
            <Link href={"/users/auth"}>Login</Link>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
