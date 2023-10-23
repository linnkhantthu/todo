"use client";

import Loading from "@/app/users/components/Loading";
import { FlashMessage } from "@/lib/models";
import React, { useEffect, useState } from "react";

function VerifyResetPasswordToken({ params }: { params: any }) {
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
      if (res.ok) {
        const { token, message } = await res.json();
        if (token) {
          setFlashMessage({ message: message, category: "bg-success" });
          setIsVerified(true);
        }
        setFlashMessage({ message: message, category: "bg-error" });
        setIsLoading(false);
      }
    }
    verifyToken(params.token);
  }, []);
  return (
    // <div className="flex flex-col justify-center">
    //   <span className=" flex flex-row justify-center">
    //     <span className="loading loading-dots loading-lg"></span>
    //   </span>
    // </div>
    <div>
      {isLoading ? (
        <>
          <Loading />
          <span>Verifying ... </span>
        </>
      ) : isVerified ? (
        <div className="flex flex-col justify-center">
          <span className=" flex flex-row justify-center">
            <p>Verification Succeed</p>
          </span>
        </div>
      ) : (
        <div className="flex flex-col justify-center">
          <span className=" flex flex-row justify-center">
            <p>Verification Failed</p>
            <a href="/users/auth"></a>
          </span>
        </div>
      )}
    </div>
  );
}

export default VerifyResetPasswordToken;
