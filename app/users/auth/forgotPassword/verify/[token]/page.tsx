"use client";

import Loading from "@/app/users/components/Loading";
import { FlashMessage } from "@/lib/models";
import useUser from "@/lib/useUser";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function VerifyResetPasswordToken({ params }: { params: any }) {
  const { data, isError, isLoading: isUserLoading } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [flashMessage, setFlashMessage] = useState<FlashMessage>();
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
          setIsVerified(true);
        } else {
          setFlashMessage({ message: message, category: "bg-error" });
        }
      } else {
        setFlashMessage({ message: message, category: "bg-error" });
      }
    }
    try {
      verifyToken(params.token);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return (
    <>
      {isUserLoading ? (
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
        <div className="flex flex-col justify-center">
          <span className=" flex flex-row justify-center">
            <p>Verification Succeed</p>
            {/* Show Password reset form */}
          </span>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <span
            className={"flex flex-row justify-center " + flashMessage?.category}
          >
            <p>{flashMessage?.message}</p>
            <a href="/users/auth">Try Again?</a>
          </span>
        </div>
      )}
    </>
  );
}

export default VerifyResetPasswordToken;
