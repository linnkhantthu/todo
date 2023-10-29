import { metadata } from "../layout";

export default function Layout({ children }: any) {
  metadata.title = "Todo";
  return (
    <>
      <div className="flex flex-col w-11/12">{children}</div>
    </>
  );
}
