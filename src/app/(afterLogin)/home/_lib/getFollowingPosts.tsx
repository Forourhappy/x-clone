import { Post } from '@/model/Post';

export const getFollowingPosts = async (): Promise<Post[]> => {
  const res = await fetch('http://localhost:9090/api/posts/followings', {
    next: { tags: ['posts', 'followings'] },
    cache: 'no-store',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
