"use client";

import useUser from "@/lib/useUser";
import React, { useState } from "react";
import Loading from "../components/Loading";
import { redirect } from "next/navigation";
import { FlashMessage, Results } from "@/lib/models";

function PleaseVerify() {
  const { data: userData, isLoading, isError } = useUser();
  const [flashMessage, setFlashMessage] = useState<FlashMessage>();
  const handleClick = () => {
    fetch("/api/users/askVerifyToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userData?.user?.email }),
    }).then((res) =>
      res.json().then((data) => {
        if (data?.message === Results.SUCCESS) {
          setFlashMessage({
            message:
              "We have sent a verification link to " + userData?.user?.email,
            category: "bg-success",
          });
        } else {
          setFlashMessage({
            message:
              "Failed to send a verification link to " + userData?.user?.email,
            category: "bg-error",
          });
        }
      })
    );
  };
  return isLoading || isError ? (
    <Loading />
  ) : userData?.user?.verified ? (
    redirect("/todos")
  ) : (
    <div className="flex flex-row justify-center h-full">
      <span className=" flex flex-col justify-center">
        <span className={flashMessage?.category}>{flashMessage?.message}</span>
        <span className="mt-36">
          We have send an verification email to your mail.
        </span>
        <span>Please verify to continue.</span>
        <span className="link link-primary" onClick={handleClick}>
          Request verification link
        </span>
      </span>
    </div>
  );
}

export default PleaseVerify;
