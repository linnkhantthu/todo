"use client";

import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { AuthResults } from "@/lib/models";
import { redirect } from "next/navigation";

function Logout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [result, setResult] = useState<AuthResults>();
  fetch("/api/users/logout")
    .then((res) => res.json())
    .then((data) => {
      setResult(data?.message);
      setIsLoading(false);
    });
  if (isLoading && result === undefined) {
    return <Loading />;
  } else {
    redirect("/users/auth");
  }
}

export default Logout;
