'use client';
import { useQuery } from '@tanstack/react-query';
import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';

const PostRecommends = () => {
  const { data } = useQuery<IPost[]>({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  return data?.map((post) => <Post key={post.postId} post={post} />);
};

export default PostRecommends;
