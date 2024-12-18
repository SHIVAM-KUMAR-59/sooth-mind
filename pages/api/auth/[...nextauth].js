import User from '@/models/User'
import dbConnect from '../../../app/lib/configDB'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export default NextAuth({
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

    async session({ session, user, token }) {
      await dbConnect()
      const dbUser = await User.findOne({ email: session.user.email })
      session.user.id = dbUser?._id
      session.user.username = dbUser?.username
      console.log('Session: ', session)
      return session
    },

    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
})
