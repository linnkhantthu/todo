"use client";
import { AuthResults, FlashMessage } from "@/lib/models";
import useUser from "@/lib/useUser";
import { redirect } from "next/navigation";
import React, { FormEvent, useState } from "react";
import Loading from "../../components/Loading";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

function ForgotPassword() {
  const { data, isError, isLoading } = useUser();
  const [flashMessage, setFlashMessage] = useState<FlashMessage>();
  const [isConnectionFailed, setIsConnectionFailed] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    let foundEmail: string | undefined = undefined;
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formDataObject = {
      email: formData.get("email"),
    };
    try {
      const res = await fetch("/api/users/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataObject),
      });
      if (res.ok) {
        const { email, message } = await res.json();
        foundEmail = email;
      }
    } catch (error: any) {
      setIsConnectionFailed(true);
      console.error(error.message);
    } finally {
      if (foundEmail) {
        setFlashMessage({
          message:
            "We have sent you an email to " +
            foundEmail +
            " to reset the password",
          category: "bg-success",
        });
      } else {
        setFlashMessage({
          message: "Email not found.",
          category: "bg-error",
        });
      }
    }
  };
  return (
    <>
      {isError || isConnectionFailed ? (
        AuthResults.CONNECTIONFAILED
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
