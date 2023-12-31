'use client';

import { getFollowingPosts } from '@/app/(afterLogin)/home/_lib/getFollowingPosts';
import { useQuery } from '@tanstack/react-query';
import { User } from '@/model/User';
import FollowRecommend from '@/app/(afterLogin)/_component/FollowRecommend';

const FollowRecommendSection = () => {
  const { data } = useQuery<User[]>({
    queryKey: ['users', 'followRecommends'],
    queryFn: getFollowingPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  return data?.map((user) => <FollowRecommend key={user.id} user={user} />);
};

export default FollowRecommendSection;
