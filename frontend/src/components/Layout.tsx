import { ReactNode } from "react";
import { NavBar } from "./NavBar";

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <header>
        <NavBar />
      </header>
      <section className="flex-1 bg-background">{children}</section>
    </div>
  );
};
