import { BookData } from "@/types";

export const fetchOneBook = async (id: number): Promise<BookData | null> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    return null;
  }
};
