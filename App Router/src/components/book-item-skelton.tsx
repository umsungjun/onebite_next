import style from "./book-item.module.css";

export default function BookItemSkeleton() {
  return (
    <div className={style.container}>
      <div className={style.skeletonImg} />
      <div className={style.skeletonInfo}>
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
