import useSWR, { useSWRConfig } from "swr";
import { User } from "./models";
import { useEffect, useState } from "react";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function useUser() {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/users/getcookie",
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
    mutateUser: mutate,
  };
}
