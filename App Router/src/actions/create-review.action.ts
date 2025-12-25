"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!bookId || !content || !author) {
    throw new Error("리뷰 작성에 실패했습니다.");
  }

  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookId, content, author }),
    });
    revalidatePath(`/book/${bookId}`);
  } catch (err) {
    console.error("리뷰 작성 중 오류 발생:", err);
  }
}
