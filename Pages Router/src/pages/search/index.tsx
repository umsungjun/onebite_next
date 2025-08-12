import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ReactNode } from "react";
import { fetchBooks } from "@/lib/fetchBooks";

import SearchAbleLayout from "@/components/SearchAbleLayout";
import BookItem from "@/components/BookItem";

/* 
  - GetServerSidePropsContext 브라우저에서 전달 받는 Props를 정의하는 타입
*/
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q;
  const books = await fetchBooks(q as string);

  return {
    props: {
      books,
    },
  };
};

export default function Page({
  books,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
