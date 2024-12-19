import User from '@/models/User'
import dbConnect from '../../../app/lib/configDB'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account }) {
      try {
        await dbConnect()

        const existingUser = await User.findOne({ email: user.email })
        if (!existingUser) {
          await User.create({
            name: user.name,
            username: `${user.email.split('@')[0]}_${Date.now()}`,
            email: user.email,
            profileImage: user.image,
            isOAuth: !!account.provider,
          })
        }

        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return false
      }
    },

    async session({ session, token }) {
      await dbConnect()
      const dbUser = await User.findOne({ email: session.user.email })

      session.user.id = dbUser?._id
      session.user.username = dbUser?.username

      // Generate and store JWT token in the cookie
      const jwtToken = jwt.sign(
        {
          id: dbUser._id,
          username: dbUser.username,
          email: dbUser.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      )

      const cookie = serialize('token', jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 24 * 60 * 60, // 1 day
        path: '/',
      })

      token.res.setHeader('Set-Cookie', cookie)

      return session
    },

    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
  events: {
    signOut({ res }) {
      const cookie = serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0),
        path: '/',
      })

      res.setHeader('Set-Cookie', cookie)
    },
  },
}

const handler = async (req, res) => {
  const nextAuthHandler = NextAuth(authOptions)
  return nextAuthHandler(req, res)
}

export default handler
