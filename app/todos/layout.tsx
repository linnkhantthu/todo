import Link from "next/link";

export default function Layout({ children }: any) {
  return (
    <>
      <main className="flex flex-col w-11/12">
        <>
          <Link className="ml-5" href="/users/auth/logout">
            Logout
          </Link>
        </>
        {children}
      </main>
    </>
  );
}
