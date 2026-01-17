"use client";

import { useActionState, useEffect, useRef } from "react";
import style from "./review-item.module.css";
import { ReviewData } from "@/types";
import { deleteReviewAction } from "@/actions/delete-reivew.action";

interface ReviewItemDeleteButtonProps {
  reviewId: ReviewData["id"];
  bookId: ReviewData["bookId"];
}

export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: ReviewItemDeleteButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(`리뷰 삭제에 실패했습니다: ${state.error}`);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" defaultValue={reviewId} hidden />
      <input name="bookId" defaultValue={bookId} hidden />
      {isPending ? (
        "삭제중..."
      ) : (
        <div
          className={style.delete_btn}
          onClick={() => formRef.current?.requestSubmit()}
        >
          삭제하기
        </div>
      )}
    </form>
  );
}
