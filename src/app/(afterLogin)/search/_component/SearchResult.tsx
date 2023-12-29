'use client';

import { useQuery } from '@tanstack/react-query';
import { Post as IPost } from '@/model/Post';
import Post from '@/app/(afterLogin)/_component/Post';
import { getSearchParams } from '@/app/(afterLogin)/search/_lib/getSearchParams';

type Props = {
  searchParams: { q: string; f?: string; pf?: string };
};

const SearchResult = ({ searchParams }: Props) => {
  const { data } = useQuery<
    IPost[],
    Object,
    IPost[],
    [_1: string, _2: string, Props['searchParams']]
  >({
    queryKey: ['post', 'search', searchParams],
    queryFn: getSearchParams,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  return data?.map((post) => <Post key={post.postId} post={post} />);
};

export default SearchResult;
