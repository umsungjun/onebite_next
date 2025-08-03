import { ReactNode } from "react";
import Link from "next/link";
import style from "./GlobalLayout.module.css";

interface GlobalLayoutProps {
  children: ReactNode;
}
export default function GlobalLayout({ children }: GlobalLayoutProps) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href="/">📚 SUNGJUN BOOKS</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>제작 @UMSUNGJUN</footer>
    </div>
  );
}
