'use client';

import { getFollowingPosts } from '@/app/(afterLogin)/home/_lib/getFollowingPosts';
import { useQuery } from '@tanstack/react-query';
import FollowRecommend from '@/app/(afterLogin)/_component/FollowRecommend';

const FollowRecommendSection = () => {
  const { data } = useQuery({
    queryKey: ['users', 'followRecommends'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  return data?.map((user) => (
    <FollowRecommend key={user.postId} user={user.User} />
  ));
};

export default FollowRecommendSection;
