import SearchAbleLayout from "@/components/SearchAbleLayout";
import { ReactNode } from "react";

export default function Page() {
  return <h1>Search</h1>;
}

Page.getLayout = (page: ReactNode) => {
  return <SearchAbleLayout>{page}</SearchAbleLayout>;
};
