import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./components/Nav";
import Main from "./components/Main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Nav isLoggedIn={true} />
        <Main>{children}</Main>
        <footer className="footer footer-center fixed bottom-0 bg-slate-800 p-2">
          <a href="mailto:dimensions.mm.it@gmail.com">
            This project is written by linnkhantthu &copy; 2023
          </a>
        </footer>
      </body>
    </html>
  );
}
