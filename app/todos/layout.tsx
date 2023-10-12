import Link from "next/link";

export default function Layout({ children }: any) {
  return (
    <>
      <nav>
        <Link href="/api/auth/logout">Logout</Link>
      </nav>
      <main>{children}</main>
    </>
  );
}
