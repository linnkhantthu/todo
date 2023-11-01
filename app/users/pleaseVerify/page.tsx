"use client";

import useUser from "@/lib/useUser";
import React, { useState } from "react";
import Loading from "../components/Loading";
import { redirect } from "next/navigation";
import { FlashMessage, Results, responseModel } from "@/lib/models";

function PleaseVerify() {
  const { data: userData, isLoading, isError } = useUser();
  const [flashMessage, setFlashMessage] = useState<FlashMessage>();
  const [isRequesting, setIsRequesting] = useState(false);
  const handleClick = async () => {
    setIsRequesting(true);
    try {
      const res = await fetch("/api/users/askVerifyToken", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data: responseModel = await res.json();
        if (data.isSuccess) {
          setFlashMessage({
            message: "We have sent a verification link to " + data.data?.email,
            category: "bg-success",
          });
        } else {
          setFlashMessage({
            message:
              "Failed to send a verification link to " + data.data?.email,
            category: "bg-error",
          });
        }
        setIsRequesting(false);
      } else {
        redirect("/users/auth");
      }
    } catch (error: any) {
      setFlashMessage({
        message: error.message,
        category: "bg-error",
      });
    }
  };
  return isLoading || isError ? (
    <Loading />
  ) : userData?.user?.verified || !userData?.user ? (
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
