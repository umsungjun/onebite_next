import { BookData } from "@/types";

export const fetchBooks = async (): Promise<BookData[]> => {
  const url = `${process.env.API_BASE_URL}/book`;

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
