"use client";

import { useActionState, useEffect } from "react";
import style from "./review-editor.module.css";

import { createReviewAction } from "@/actions/create-review.action";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  // useActionState: 서버 액션의 상태와 폼 액션, 대기 상태를 관리하는 훅 React 19version
  // state: 서버 액션의 반환 값
  // formAction: 폼에 전달할 액션 핸들러
  // isPending: 서버 액션이 진행 중인지 여부를 나타내는 불리언 값
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(`리뷰 작성에 실패했습니다: ${state.error}`);
    }
  }, [state]);

  return (
    <section>
      <form className={style.form_container} action={formAction}>
        <input name="bookId" defaultValue={bookId} hidden readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input
            required
            name="author"
            disabled={isPending}
            placeholder="작성자"
          />
          <button type="submit" disabled={isPending}>
            {isPending ? "로딩중..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
