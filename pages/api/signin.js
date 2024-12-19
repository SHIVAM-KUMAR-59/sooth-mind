// pages/api/auth/signin.js
import configDB from '@/app/lib/configDB'
import User from '@/models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

const Signin = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    await configDB()

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: 'User not found' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }

    // Generate JWT token
    const jwtToken = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    )

    // Set cookie with the token
    const cookie = serialize('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })

    // Set the cookie header
    res.setHeader('Set-Cookie', cookie)

    // Respond with success message
    return res.status(200).json({
      message: 'User logged in successfully',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        bio: user.bio,
      },
    })
  } catch (error) {
    console.error('Error logging in:', error)
    return res.status(500).json({ message: 'Error Logging In' })
  }
}

export default Signin
