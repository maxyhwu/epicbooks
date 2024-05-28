import NextAuth from "next-auth";
import CredentialsProvider from "./CredientialsProviders";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [CredentialsProvider],
  callbacks: {
    async session({ session, token }) {
      const email = token.email || session.user?.email;
      if (!email) return session;

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getId?email=${email}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Failed to fetch user ID:', response.statusText);
          return session;
        }

        const user = await response.json();
        return {
          ...session,
          user: {
            ...session.user,
            id: user.id,
          },
        };
      } catch (error) {
        console.error('Error fetching user ID:', error);
        return session;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  pages: {
    signIn: "/",
  },
});
