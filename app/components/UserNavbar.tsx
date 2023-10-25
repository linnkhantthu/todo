"use client";

import { AuthResults, Results } from "@/lib/models";
import useUser from "@/lib/useUser";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function UserNavbar() {
  const router = useRouter();

  // Fetch user from cookie
  const { data, isLoading, isError, mutateUser } = useUser();
  const [isConnectionFailed, setIsConnectionFailed] = useState(false);

  // Handle Logout
  const handleLogout = () => {
    try {
      fetch("/api/users/logout")
        .then((res) => res.json())
        .then((resData) => {
          if (resData?.message === Results.SUCCESS) {
            router.push("/users/auth");
            mutateUser({ ...data, user: undefined, isLoggedIn: false });
          }
        });
    } catch (error: any) {
      setIsConnectionFailed(true);
      console.log(error.message);
    }
  };

  return (
    <>
      {isConnectionFailed ? (
        AuthResults.CONNECTIONFAILED
      ) : isLoading || isError ? (
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
