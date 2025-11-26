import BookItemSkeleton from "@/components/book-item-skelton";

export default function Loading() {
  return Array.from({ length: 5 }).map((_, index) => (
    <BookItemSkeleton key={index} />
  ));
}
