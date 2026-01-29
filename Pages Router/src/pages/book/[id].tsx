import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import style from "./[id].module.css";
import { fetchOneBook } from "@/lib/fetchOneBook";
import Image from "next/image";

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
    // fallback옵션 없는 경로(id) 요청 시, 기본 값 false
    // fallback: false, // 지정하지 않은 id 경로는 404 페이지로 처리
    // fallback: true, // 데이터를 제외한 페이지만 미리 반환(next 서버에 정적 페이지 추가 됨)
    fallback: "blocking", // SSR 방식으로 페이지 사전 랜더링, next 서버에 정적 페이지 추가 됨
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id; // 무조건 URL 파라미터가 존재해야 페이지에 접근할 수 있음

  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true, // 해당 id에 대한 도서 정보가 없을 경우 404 페이지로 이동
    };
  }

  return {
    props: { book },
  };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) return <div>로딩 중...</div>;

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
        <Image
          src={coverImgUrl}
          width={280}
          height={350}
          alt={`${title} 이미지`}
        />
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
