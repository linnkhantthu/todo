import useSWR from "swr";
import { User } from "./models";

const fetcher = (url: RequestInfo | URL) =>
  fetch(url).then((res) => res.json());

export default function useUser() {
  const {
    data,
    error,
    isLoading,
  }: { data: User; error: any; isLoading: boolean } = useSWR(
    "/api/auth/getcookie",
    fetcher
  );

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
