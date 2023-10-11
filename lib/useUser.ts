import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function useUser() {
  const { data, error, isLoading } = useSWR("/api/auth/getcookie", fetcher);

  return {
    user: data,
    isLoading,
    isError: error,
  };
}
