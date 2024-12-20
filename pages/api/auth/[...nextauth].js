import User from '../../../models/User'
import dbConnect from '../../../app/lib/configDB'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { serialize } from 'cookie'
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Enter Your Details',
      credentials: {
        name: { label: 'Name', type: 'text' },
        email: { label: 'Email', type: 'email' },
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          throw new Error('All fields are required')
        }

        try {
          await dbConnect()

          const existingUser = await User.findOne({ email: credentials.email })
          console.log(existingUser)

          if (existingUser) {
            if (existingUser.isOAuth) {
              return existingUser
            }

            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              existingUser.password,
            )

            if (!isPasswordValid) {
              throw new Error('Invalid credentials')
            }

            return {
              id: existingUser._id,
              name: existingUser.name,
              email: existingUser.email,
              username: existingUser.username,
            }
          } else {
            // Create new user
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(credentials.password, salt)

            const newUser = await User.create({
              name: credentials.name,
              email: credentials.email,
              username: credentials.username,
              password: hashedPassword,
            })

            return {
              id: newUser._id,
              name: newUser.name,
              email: newUser.email,
              username: newUser.username,
            }
          }
        } catch (error) {
          console.error('Error in authorize callback:', error)
          throw new Error('Authentication failed')
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await dbConnect()

        const existingUser = await User.findOne({ email: user.email })

        if (!existingUser) {
          // If the user is signing in with OAuth for the first time
          await User.create({
            name: user.name,
            username: `${user.email.split('@')[0]}_${Date.now()}`,
            email: user.email,
            profileImage: user.image || null,
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
      try {
        await dbConnect()
        const dbUser = await User.findOne({ email: session.user.email })

        session.user.id = dbUser?._id
        session.user.username = dbUser?.username
        return session
      } catch (error) {
        console.error('Error in session callback:', error)
        return session
      }
    },

    async redirect({ baseUrl }) {
      return baseUrl
    },
  },
}

const handler = async (req, res) => {
  try {
    return await NextAuth(req, res, authOptions)
  } catch (error) {
    console.error('Error in NextAuth handler:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export default handler
