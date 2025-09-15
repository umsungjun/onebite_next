import { BookData } from "@/types";

import BookItem from "@/components/book-item";
import NoSearchBook from "@/components/noSearchBook";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/search?q=${q}`
  );

  if (res.ok === false) {
    return <NoSearchBook />;
  }

  const books: BookData[] = await res.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
