import { ReactNode } from "react";

import SearchAbleLayout from "@/components/SearchAbleLayout";
import BookItem from "@/components/BookItem";

import books from "@/mock/books.json";

export default function Page() {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchAbleLayout>{page}</SearchAbleLayout>;
};
