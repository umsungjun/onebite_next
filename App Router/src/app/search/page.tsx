interface PageProps {
  searchParams: Promise<{ q: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { q } = await searchParams;

  return <div>search 페이지:{q}</div>;
}
