import { ReactNode } from "react";
import { InferGetStaticPropsType } from "next";
import style from "./index.module.css";
import { fetchBooks } from "@/lib/fetchBooks";
import { fetchRandomBooks } from "@/lib/fetchRandomBooks";

import SearchAbleLayout from "@/components/SearchAbleLayout";
import BookItem from "@/components/BookItem";

export const getStaticProps = async () => {
  console.log("getStaticProps called");
  // Home 컾포넌트를 렌더링 하기 이전에 서버 사이드에서 데이터를 가져오는 함수
  const [allBooks, randomBoos] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      randomBoos,
    },
  };
};

export default function Home({
  allBooks,
  randomBoos,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {randomBoos.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록 된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchAbleLayout>{page}</SearchAbleLayout>;
};
