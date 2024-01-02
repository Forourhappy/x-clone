import { Post } from '@/model/Post';

export const getFollowingPosts = async (): Promise<Post[]> => {
  const res = await fetch('http://localhost:9090/api/followingPosts', {
    next: { tags: ['posts', 'followings'] },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
