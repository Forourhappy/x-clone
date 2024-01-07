import { Post } from '@/model/Post';
import { QueryFunction } from '@tanstack/react-query';

export const getSearchParams: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; pf?: string }]
> = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [_1, _2, searchParams] = queryKey;
  const res = await fetch(
    `http://localhost:9090/api/posts?${searchParams.toString()}`,
    {
      next: { tags: ['post', 'search', searchParams.q] },
      cache: 'no-store',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
