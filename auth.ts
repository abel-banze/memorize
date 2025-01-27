import NextAuth, { Session } from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/actions/config"
import { getUserById } from "@/actions/show";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/login',
    error: '/auth/error'
  },
  events: {
    async linkAccount({user}){
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    }
  },

  callbacks: {
    async session({session, token}){
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token && 'role' in token && session.user) {
        session.user.role = token.role as 'ADMIN' | 'GUEST' | 'SUPERADMIN';
      }

      return session;
    },

    async jwt({ token, account }){
      if(!token.sub) return token;
      
      if(account){
        token.accessToken = account.accessToken;
      }
      const existingUser = await getUserById(token.sub);
      
      if(!existingUser) return token;

      return token;
    },
  },

  secret: process.env.AUTH_SECRET,
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,

})