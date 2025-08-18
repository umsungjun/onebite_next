import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import { fetchOneBook } from "@/lib/fetchOneBook";

/**
 * Book 페이지 - Optional Catch All Segments
 * - /book (인덱스 경로)
 * - /book/[id] (단일 파라미터)
 * - /book/[id]/[id] (다중 파라미터)
 */

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: false, // 지정하지 않은 id 경로는 404 페이지로 처리
    // fallback: true, // 지정하지 않은 id 경로는 로딩 상태로 처리
    // fallback: "blocking", // 지정하지 않은 id 경로는 서버에서 데이터를 가져 오는 동안 로딩 상태로 처리하고, 데이터가 준비되면 페이지를 렌더링
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // 무조건 URL 파라미터가 존재해야 페이지에 접근할 수 있음

  const book = await fetchOneBook(Number(id));

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!book) {
    return (
      <div className={style.container}>
        <span className={style.noSearchBook}>
          도서 정보를 찾을 수 없습니다.
        </span>
      </div>
    );
  }

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        style={{ backgroundImage: `url(${coverImgUrl})` }}
        className={style.coverImgContainer}
      >
        <img src={coverImgUrl} alt={`${title} 이미지`} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
}
