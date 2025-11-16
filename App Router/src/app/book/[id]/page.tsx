import Image from "next/image";
import style from "./page.module.css";

import NoSearchBook from "@/components/noSearchBook";
import { notFound } from "next/navigation";

/* 
  - 동적 경로 페이지 사전 생성
  - 빌드 시점에 미리 랜더링하기 때문에 최신 데이터가 반영되지 않을 수 있음
*/
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/book/${id}`);

  if (res.ok === false) {
    if (res.status === 404) {
      notFound();
    }

    return <NoSearchBook />;
  }

  const book = await res.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} width={280} height={350} alt="도서 이미지" />
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
