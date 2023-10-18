import Body from "../components/Body";

export default function Layout({ children }: any) {
  return (
    <>
      <Body isLoggedIn={true}>
        <div className="flex flex-col w-11/12">{children}</div>
      </Body>
    </>
  );
}
