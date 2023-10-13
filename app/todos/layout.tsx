import Link from "next/link";

export default function Layout({ children }: any) {
  return (
    <>
      <main className="flex flex-col w-auto">
        <>
          <Link className="ml-5" href="/api/auth/logout">
            Logout
          </Link>
        </>
        {children}
      </main>
    </>
  );
}
