import configDB from '@/app/lib/configDB'
import User from '@/models/User'
import bcrypt from 'bcrypt'

const Signup = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const {
    name,
    username,
    email,
    password,
    profileImage = '',
    bio = '',
  } = req.body

  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  try {
    await configDB()

    const existingUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Username or email already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      profileImage,
      bio,
    })

    await user.save()

    res.status(201).json({
      message: 'User created successfully',
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
    console.error(error)
    return res.status(500).json({ message: 'Error creating user' })
  }
}

export default Signup
