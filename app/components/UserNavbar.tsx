"use client";

import useUser from "@/lib/useUser";
import Link from "next/link";
import React from "react";

function UserNavbar() {
  const { user, isLoading, isError } = useUser();
  return (
    <>
      {isLoading || isError ? (
        <span className="loading loading-dots loading-sm"></span>
      ) : user ? (
        <ul className="menu menu-horizontal px-1">
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
        </ul>
      ) : (
        <Link href={"/users/auth"}>Login</Link>
      )}
    </>
  );
}

export default UserNavbar;
