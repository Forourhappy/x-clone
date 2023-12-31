'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import { getUserPosts } from '@/app/(afterLogin)/[username]/_lib/getUserPosts';
import Post from '@/app/(afterLogin)/_component/Post';

type Props = {
  username: string;
};

const UserPosts = ({ username }: Props) => {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, string]
  >({
    queryKey: ['posts', 'users', username],
    queryFn: getUserPosts,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['users', username]);
  console.log('user', user);
  if (user) {
    return data?.map((post) => <Post key={post.postId} post={post} />);
  }
};

export default UserPosts;
