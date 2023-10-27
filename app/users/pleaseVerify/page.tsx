"use client";

import useUser from "@/lib/useUser";
import React from "react";
import Loading from "../components/Loading";
import { redirect } from "next/navigation";

function PleaseVerify() {
  const { data, isLoading, isError } = useUser();
  return isLoading || isError ? (
    <Loading />
  ) : data?.user?.verified ? (
    redirect("/todos")
  ) : (
    <div className="flex flex-row justify-center h-full">
      <span className=" flex flex-col justify-center">
        <span className="mt-36">
          We have send an verification email to your mail.
        </span>
        <span>Please verify to continue .</span>
      </span>
    </div>
  );
}

export default PleaseVerify;
