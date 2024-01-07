import { QueryFunction } from '@tanstack/react-query';
import { User } from '@/model/User';
import { cookies } from 'next/headers';

export const getUserClient: QueryFunction<
  User,
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  const [_1, username] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${username}`, {
    next: { tags: ['users', username] },
    cache: 'no-store',
    headers: {
      cookie: cookies().toString(),
    },
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
