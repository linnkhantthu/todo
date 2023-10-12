import useSWR from "swr";
import { User } from "./models";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function useUser() {
  const { data, error, isLoading } = useSWR("/api/auth/getcookie", fetcher);
  let user: User | undefined = undefined;
  if (data?.username) {
    user = {
      username: data?.username,
      email: data?.email,
      dob: data?.dob,
    };
  }
  return {
    user: user,
    isLoggedIn: data?.isLoggedIn,
    isLoading,
    isError: error,
  };
}
