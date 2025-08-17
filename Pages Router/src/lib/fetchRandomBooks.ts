import { BookData } from "@/types";

export const fetchRandomBooks = async (): Promise<BookData[]> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/book/random`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error();
    }
    return await response.json();
  } catch (error) {
    console.error(error);

    return [];
  }
};
