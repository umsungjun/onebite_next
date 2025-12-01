"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void; // reset 함수는 에러를 복구하고 컴포넌트를 다시 렌더링할 때 사용
}

export default function Error({ error, reset }: ErrorProps) {
  const router = useRouter();

  return (
    <div>
      <h3>{`에러가 발생했습니다: ${error.message}`}</h3>
      <button
        onClick={() => {
          //    window.location.reload(); // 브라우저 API를 사용한 새로고침
          startTransition(() => {
            router.refresh(); // Next.js의 라우터를 사용한 새로고침(페이지에 보여지는 서버 컴포넌트 재호출)
            reset(); // 클라이언트 컴포넌트 리렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
