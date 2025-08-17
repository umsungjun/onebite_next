import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BookData } from "@/types";
import { fetchBooks } from "@/lib/fetchBooks";

import SearchAbleLayout from "@/components/SearchAbleLayout";
import BookItem from "@/components/BookItem";

/* 
  - GetServerSidePropsContext 브라우저에서 전달 받는 Props를 정의하는 타입
*/
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//   const q = context.query.q;
//   const books = await fetchBooks(q as string);

//   return {
//     props: {
//       books,
//     },
//   };
// };

export default function Page() {
  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const { q } = router.query;

  const fetchSearchResult = async (q: string) => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };

  useEffect(() => {
    if (q) {
      fetchSearchResult(q as string);
    }
  }, [q]);

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
