"use client";

import { Results } from "@/lib/models";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";

function Verify({ params }: { params: { token: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(true);

  useEffect(() => {
    fetch("/api/users/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: params.token }),
    }).then((res) =>
      res.json().then((data) => {
        if (data?.message === Results.SUCCESS) {
          setIsSubmitting(false);
        } else {
          setIsSubmitting(false);
        }
      })
    );
  }, []);
  return (
    <div>
      {isSubmitting ? (
        <>
          <Loading />
          <p>Verifying</p>
        </>
      ) : (
        <a href="/users/auth">Go Home</a>
      )}
    </div>
  );
}

export default Verify;
