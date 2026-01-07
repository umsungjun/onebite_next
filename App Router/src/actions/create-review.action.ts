"use server";

import { revalidateTag } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    return {
      status: false,
      error: "필수 값(bookId, content, author)이 누락되었습니다.",
    };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId, content, author }),
    });

    if (!res.ok) {
      throw new Error(`리뷰 작성에 실패했습니다: ${res.statusText}`);
    }

    // 1. 특정 주소의 해당하는 페이지만 재검증
    // revalidatePath(`/book/${bookId}`);

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath("/book/[id]", "page");

    // 3. 특정 경로의 모든 동적 페이지 레이아웃을 재검증
    // revalidatePath("(with-searchbar)", "layout");

    // 4. 모든 페이지 재검증
    // revalidatePath("/", "layout");

    // 5. 태그 기준 재검증(fetch에서 tag 옵션 사용 시 사용 가능)
    revalidateTag(`${bookId}-reviews`);

    return { status: true, error: "" };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 작성 중 오류가 발생했습니다: ${err}`,
    };
  }
}
