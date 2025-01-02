import User from '@/models/User'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, name, email, bio, profileImage, password } = req.body

    if (req.body.length <= 0) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    try {
      const user = await User.findById(id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      user.name = name || user.name
      user.email = email || user.email
      user.bio = bio || user.bio
      user.profileImage = profileImage || user.profileImage

      if (password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        user.password = hashedPassword
      }

      await user.save()

      return res
        .status(200)
        .json({ message: 'User updated successfully', data: user })
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user', error })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
