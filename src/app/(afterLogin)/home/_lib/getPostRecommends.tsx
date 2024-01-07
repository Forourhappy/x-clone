import { Post } from '@/model/Post';

type Props = {
  pageParam?: number;
};

export const getPostRecommends = async ({
  pageParam,
}: Props): Promise<Post[]> => {
  const res = await fetch(
    `http://localhost:9090/api/posts/Recommends?cursor=${pageParam}`,
    {
      next: { tags: ['posts', 'recommends'] },
      cache: 'no-store',
      credentials: 'include',
    },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
