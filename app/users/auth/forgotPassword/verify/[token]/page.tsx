"use client";

import Loading from "@/app/users/components/Loading";
import { FlashMessage } from "@/lib/models";
import useUser from "@/lib/useUser";
import React, { FormEvent, useEffect, useState } from "react";
import PasswordResetForm from "../../components/PasswordResetForm";
import { redirect } from "next/navigation";

function VerifyResetPasswordToken({ params }: { params: { token: string } }) {
  const { data, isError, isLoading: isUserLoading } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [flashMessage, setFlashMessage] = useState<FlashMessage>();
  const [fetchedToken, setFetchedToken] = useState<string | undefined>(
    undefined
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isResetted, setIsResetted] = useState(false);

  const handleSubmit = async (e: FormEvent, token: string) => {
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const password = formData.get("password");
    const res = await fetch("/api/users/forgotPassword/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, password: password?.toString() }),
    });
    const { email, message } = await res.json();
    if (res.ok) {
      if (email) {
        setIsResetted(true);
        setIsSubmitted(true);
      } else {
        setIsResetted(false);
        setIsSubmitted(true);
      }
    }
  };
  useEffect(() => {
    async function verifyToken(token: string) {
      const res = await fetch("/api/users/forgotPassword/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      const { token: fetchedToken, message } = await res.json();
      if (res.ok) {
        if (fetchedToken !== undefined) {
          setFlashMessage({ message: message, category: "bg-success" });
          setFetchedToken(fetchedToken);
          setIsVerified(true);
        } else {
          setFlashMessage({ message: message, category: "text-error" });
        }
      } else {
        setFlashMessage({ message: message, category: "text-error" });
      }
    }
    try {
      verifyToken(params.token);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [params.token]);
  return (
    <>
      {isUserLoading || isError ? (
        <Loading />
      ) : data?.user ? (
        <div className="flex flex-col justify-center">
          <span className=" flex flex-row justify-center">
            <p className={flashMessage?.category}>{flashMessage?.message}</p>
          </span>
        </div>
      ) : isLoading ? (
        <>
          <Loading />
          <span>Verifying ... </span>
        </>
      ) : isVerified ? (
        isSubmitted && isResetted ? (
          redirect("/users/auth")
        ) : (
          <div className="flex flex-col justify-center">
            <span className=" flex flex-row justify-center">
              <PasswordResetForm
                flashMessage={flashMessage}
                handleSubmit={handleSubmit}
                fetchedToken={fetchedToken}
              />
            </span>
          </div>
        )
      ) : (
        <div className="flex flex-row justify-center">
          <span
            className={"flex flex-col justify-center " + flashMessage?.category}
          >
            <span>{flashMessage?.message}</span>
            <a href="/users/auth/forgotPassword">Try Again?</a>
          </span>
        </div>
      )}
    </>
  );
}

export default VerifyResetPasswordToken;
