import BookPage from "@/app/book/[id]/page";
import style from "./page.module.css";

export default async function Page(props: any) {
  return (
    <div className={style.popupContainer}>
      <div className={style.popupContent}>
        <BookPage {...props} />
      </div>
    </div>
  );
}
