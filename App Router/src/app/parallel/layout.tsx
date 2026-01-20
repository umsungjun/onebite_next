import Link from "next/link";
import { ReactNode } from "react";

export default function Layout({
  children,
  header,
  footer,
}: {
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div>
      <Link href="/parallel">parallel</Link>
      &nbsp;|&nbsp;
      <Link href="/parallel/myName">myName</Link>
      <br />
      <br />
      {header}
      {children}
      {footer}
    </div>
  );
}
