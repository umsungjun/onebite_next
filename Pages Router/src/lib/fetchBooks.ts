import { BookData } from "@/types";

export const fetchBooks = async (q?: string): Promise<BookData[]> => {
  let url = `${process.env.API_BASE_URL}/book`;

  if (q) {
    url = `${process.env.API_BASE_URL}/book/search?q=${q}`;
  }

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
