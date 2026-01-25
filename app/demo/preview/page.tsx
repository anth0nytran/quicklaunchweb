import { redirect } from 'next/navigation';

export default function PreviewPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const params = new URLSearchParams();
  Object.entries(searchParams ?? {}).forEach(([key, value]) => {
    if (typeof value === 'string') {
      params.set(key, value);
    }
  });

  const query = params.toString();
  redirect(query ? `/demo?${query}` : '/demo');
}
