import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { parse } from 'cookie';
import { cookies } from 'next/headers';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  pages: {
    signIn: '/i/flow/login',
    newUser: '/i/flow/signup',
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(`${process.env.AUTH_URL}/api/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: credentials.username,
            password: credentials.password,
          }),
        });

        let setCookie = authResponse.headers.get('Set-Cookie');
        console.log(setCookie);

        if (setCookie) {
          const parsed = parse(setCookie);
          cookies().set('connect.sid', parsed['connect.sid'], parsed);
        }

        if (!authResponse.ok) {
          return null;
        }

        const user = await authResponse.json();

        return {
          ...user,
          name: user.nickname,
        };
      },
    }),
  ],
});
