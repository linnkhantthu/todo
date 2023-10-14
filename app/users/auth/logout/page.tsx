"use client";

import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { AuthResults } from "@/lib/models";
import { redirect } from "next/navigation";

function Logout() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [result, setResult] = useState<AuthResults>();
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/users/logout");
      const data = await res.json();
      setResult(data?.message);
    }
    fetchData();
  }, []);
  if (isLoading && result === undefined) {
    return <Loading />;
  } else {
    redirect("/users/auth");
  }
}

export default Logout;
