'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import Post from '@/app/(afterLogin)/_component/Post';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const PostRecommends = () => {
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts', 'recommends'],
    queryFn: getPostRecommends,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);
  return (
    <>
      {data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.map((post) => (
            <Post key={post.postId} post={post} />
          ))}
        </Fragment>
      ))}
      <div ref={ref} style={{ height: 50 }} />
    </>
  );
};

export default PostRecommends;
