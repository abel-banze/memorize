import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { db } from "@/actions/config";
import bcrypt from "bcryptjs";
import validator from "validator";


import type { NextAuthConfig } from "next-auth"

const login: any = async (credentials: {
  email: string;
  password: string;
}) => {
  try {

    if(!validator.isEmail(credentials.email)) throw new Error("INVALID_EMAIL");

    const check = await db.user.findUnique({
      where: {
        email: credentials.email
      }
    });

    if(check?.status === 'blocked') throw new Error("USER_BLOCKED");;
    
    if(!check) throw new Error("USER_NOT_FOUND");

    const isCorrect = await bcrypt.compare(
      credentials.password,
      check.hashPass!
    );

    if (!isCorrect) throw Error("INVALID_CREDENTIALS");

    return check;
  } catch(err) {
    console.log(err)
    throw Error("Failed to signin.")
  }
}

const nextAuthConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;

        } catch(err) {
          console.log(err)
          return null;
        }
      }
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET
    }),
  ]
};

export default nextAuthConfig;