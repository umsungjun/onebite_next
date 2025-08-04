import { ReactNode } from "react";
import type { AppProps } from "next/app";
import "@/styles/globals.css";
import GlobalLayout from "@/components/GlobalLayout";

interface MyAppProps extends AppProps {
  Component: AppProps["Component"] & {
    getLayout?: (page: ReactNode) => ReactNode;
  };
}

export default function App({ Component, pageProps }: MyAppProps) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
