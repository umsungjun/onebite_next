import style from "./page.module.css";
import { BookData } from "@/types";

import BookItem from "@/components/book-item";
import NoSearchBook from "@/components/noSearchBook";
import { Metadata } from "next";

/* 
  - auto: 기본값, 요청에 따라 동적 또는 정적 랜더링 결정
  - force-dynamic: 페이지를 강제로 Dynamic 페이지로 렌더링
  - force-static: 페이지를 강제로 Static 페이지로 렌더링
  - error: 페이지를 강제로 Static 페이지로 렌더링 시도, 불가능할 경우 에러 발생
*/
export const dynamic = "auto";

async function AllBooks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book`, {
    cache: "force-cache",
  });

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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/random`,
    {
      next: { revalidate: 10 },
    },
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

export const metadata: Metadata = {
  title: "Next.js 한입 북스",
  description: "Next.js 한입 북스 연습용 프로젝트입니다.",
  openGraph: {
    title: "Next.js 한입 북스",
    description: "Next.js 한입 북스 연습용 프로젝트입니다.",
    images: [
      {
        url: "/thumbnail.png",
      },
    ],
  },
};

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
