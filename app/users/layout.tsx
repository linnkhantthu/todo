import Body from "../components/Body";

export default function Layout({ children }: any) {
  return (
    <>
      <Body isLoggedIn={false}>{children}</Body>
    </>
  );
}
