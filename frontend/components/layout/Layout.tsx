import { Header } from "./Header";
import { ReactElement } from "react";

export function Layout({ children }: { children: ReactElement }) {
  return (
    <>
      <Header />
      <main>
        <div>{children}</div>
      </main>
    </>
  );
}
