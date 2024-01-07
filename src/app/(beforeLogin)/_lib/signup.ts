'use server';

import { redirect } from 'next/navigation';
import { signIn } from '@/auth';

export default async (
  prevState: { message: string | null },
  formData: FormData,
) => {
  if (!formData.get('id') || !(formData.get('id') as string)?.trim()) {
    return { message: 'no_id' };
  }

  if (
    !formData.get('nickname') ||
    !(formData.get('nickname') as string)?.trim()
  ) {
    return { message: 'no_name' };
  }

  if (
    !formData.get('password') ||
    !(formData.get('password') as string)?.trim()
  ) {
    return { message: 'no_password' };
  }

  if (!formData.get('image')) {
    return { message: 'no_image' };
  }

  let shouldRedirect = false;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/users`,
      {
        method: 'post',
        body: formData,
        credentials: 'include',
      },
    );
    console.log('결과: ', response.status);
    console.log(response.status);
    if (response.status === 403) {
      return { message: 'user_exists' };
    }
    console.log(await response.json());
    shouldRedirect = true;

    await signIn('credentials', {
      redirect: false,
      username: formData.get('id'),
      password: formData.get('password'),
    });
  } catch (err) {
    console.dir(err, { depth: 3 });
  }

  // try/catch 안에서 사용 X
  if (shouldRedirect) {
    redirect('/home');
  }
  return { message: null };
};
