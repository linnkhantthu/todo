"use client";

import { AuthResults } from "@/lib/models";
import useUser from "@/lib/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function UserNavbar() {
  const { data, isLoading, isError, mutateUser } = useUser();
  const router = useRouter();
  const handleLogout = () => {
    fetch("/api/users/logout")
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.message === AuthResults.LOGGEDOUT) {
          router.push("/users/auth");
          mutateUser({ ...data, user: undefined });
        }
      });
  };

  return (
    <>
      {isLoading || isError ? (
        <span className="loading loading-dots loading-sm"></span>
      ) : data?.user ? (
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>
                <div>{data?.user?.username}</div>
              </summary>
              <ul className="p-2 bg-base-100">
                <li>
                  <a>Account</a>
                </li>
                <li>
                  <span className="ml-5" onClick={handleLogout}>
                    Logout
                  </span>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      ) : (
        ""
      )}
    </>
  );
}

export default UserNavbar;