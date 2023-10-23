import Loading from "@/app/users/components/Loading";
import React, { useEffect, useState } from "react";

function VerifyResetPasswordToken({ params }: { params: any }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  useEffect(() => {
    async function verifyToken(token: string) {
      let data: any = undefined;
      const res = await fetch("/api/users/verifyPasswordToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });
      if (res.ok) {
        data = await res.json();
        setIsVerified(true);
        setIsLoading(false);
      }
    }
    verifyToken(params.token);
  }, []);
  return (
    <div>
      {!isLoading ? (
        <>
          <Loading />
          <span>Verifying ... </span>
        </>
      ) : isVerified ? (
        <>
          <p>Verification Successed</p>
          <a href="/todos">Go Todos</a>
        </>
      ) : (
        <>
          <p>Verification Failed</p>
          <a href="/todos">Go Todos</a>
        </>
      )}
    </div>
  );
}

export default VerifyResetPasswordToken;
