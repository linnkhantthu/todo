"use client";
import { AuthResults, FlashMessage, responseModel } from "@/lib/models";
import useUser from "@/lib/useUser";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import Loading from "../../components/Loading";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

function ForgotPassword() {
  const { data, isError, isLoading } = useUser();
  const [flashMessage, setFlashMessage] = useState<FlashMessage>();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formEmail = formData.get("email");
    try {
      if (formEmail?.length !== 0) {
        const res = await fetch("/api/users/forgotPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.get("email"),
          }),
        });
        const { data, isSuccess, message }: responseModel = await res.json();
        if (res.ok && isSuccess && data?.email && message) {
          setFlashMessage({
            message: message,
            category: "bg-success",
          });
        } else {
          throw new Error(message);
        }
      }
    } catch (error: any) {
      setFlashMessage({
        message: error.message,
        category: "bg-error",
      });
    }
  };
  return (
    <>
      {isError ? (
        <span>{AuthResults.CONNECTIONFAILED}</span>
      ) : isLoading ? (
        <Loading />
      ) : data.user === undefined ? (
        <ForgotPasswordForm
          flashMessage={flashMessage}
          handleSubmit={handleSubmit}
        />
      ) : (
        redirect("/todos")
      )}
    </>
  );
}

export default ForgotPassword;
