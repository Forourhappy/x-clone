'use client';
import { useSuspenseQuery } from '@tanstack/react-query';
import Post from '@/app/(afterLogin)/_component/Post';
import { getFollowingPosts } from '@/app/(afterLogin)/home/_lib/getFollowingPosts';

const FollowingPosts = () => {
  const { data } = useSuspenseQuery({
    queryKey: ['posts', 'followings'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  return data?.map((post) => <Post key={post.postId} post={post} />);
};

export default FollowingPosts;
