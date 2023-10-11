import Router from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

export default function useUser({
  redirectTo = false,
  redirectIfFound = false,
}: {
  redirectTo?: boolean | string;
  redirectIfFound?: boolean;
} = {}) {
  const { data: user, mutate: mutateUser } = useSWR("/api/auth/getCookie");
  useEffect(() => {
    if (!redirectTo || !user) return;
    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);
}
