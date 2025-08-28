import { ReactNode } from "react";

import SearchBar from "./searchbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <SearchBar />
      {children}
    </div>
  );
}
