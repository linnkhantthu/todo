"use client";

import useUser from "@/lib/useUser";
import React, { useState } from "react";
import Loading from "../components/Loading";
import { redirect } from "next/navigation";
import { FlashMessage, Results } from "@/lib/models";

function PleaseVerify() {
  const { data: userData, isLoading, isError } = useUser();
  const [flashMessage, setFlashMessage] = useState<FlashMessage>();
  const [isRequesting, setIsRequesting] = useState(false);
  const handleClick = () => {
    setIsRequesting(true);
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
        setIsRequesting(false);
      })
    );
  };
  return isLoading || isError ? (
    <Loading />
  ) : userData?.user?.verified ? (
    redirect("/todos")
  ) : (
    <div className="flex flex-row justify-center h-full mt-36">
      <span className=" flex flex-col justify-center">
        <span className={"rounded p-1 " + flashMessage?.category}>
          {flashMessage?.message}
        </span>
        <span>We have send an verification email to your mail.</span>
        <span>Please verify to continue.</span>
        <span className="link link-success" onClick={handleClick}>
          {isRequesting ? (
            <small className=" float-left">
              <Loading />
            </small>
          ) : (
            "Request verification link"
          )}
        </span>
      </span>
    </div>
  );
}

export default PleaseVerify;
