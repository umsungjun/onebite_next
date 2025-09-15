import style from "./page.module.css";
import { BookData } from "@/types";

import BookItem from "@/components/book-item";
import NoSearchBook from "@/components/noSearchBook";

async function AllBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book`);

  if (res.ok === false) {
    return <NoSearchBook />;
  }

  const allBooks: BookData[] = await res.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecommendedBooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/random`
  );

  if (res.ok === false) {
    return <NoSearchBook />;
  }

  const recommendationBooks: BookData[] = await res.json();

  return (
    <div>
      {recommendationBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecommendedBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
