import { Results } from "@/lib/models";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import Loading from "../components/Loading";

function Verify({ searchParams }: { searchParams: { token: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(true);
  fetch("/api/users/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: searchParams.token }),
  }).then((res) =>
    res.json().then((data) => {
      if (data?.message === Results.SUCCESS) {
        setIsSubmitting(false);
      }
    })
  );
  return (
    <div>
      {isSubmitting ? (
        <>
          <Loading />
          <p>Verifying</p>
        </>
      ) : (
        redirect("/users/auth")
      )}
    </div>
  );
}

export default Verify;
