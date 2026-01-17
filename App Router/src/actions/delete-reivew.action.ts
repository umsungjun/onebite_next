"use server";

import { revalidateTag } from "next/cache";

export async function deleteReviewAction(_: any, formData: FormData) {
  const reviewId = formData.get("reviewId")?.toString();
  const bookId = formData.get("bookId")?.toString();

  if (reviewId === undefined) {
    return {
      status: false,
      error: "필수 값(reviewId)이 누락되었습니다.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) {
      throw new Error(`리뷰 삭제에 실패했습니다: ${res.statusText}`);
    }

    revalidateTag(`${bookId}-reviews`);

    return { status: true, error: "" };
  } catch (err) {
    return {
      status: false,
      error: `리뷰 삭제 중 오류가 발생했습니다: ${err}`,
    };
  }
}
