import useSWR from "swr";
import { User } from "./models";
import { useEffect, useState } from "react";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function useUser() {
  const { data, error, isLoading } = useSWR("/api/users/getcookie", fetcher);
  const [user, setUser] = useState<User>(data?.user);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(data?.isLoggedIn);

  useEffect(() => {
    setUser(data?.user);
    setIsLoggedIn(data?.isLoggedIn);
  }, [data]);

  return {
    user: user,
    isLoggedIn: isLoggedIn,
    isLoading,
    isError: error,
  };
}
