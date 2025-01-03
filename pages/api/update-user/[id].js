import configDB from '@/app/lib/configDB'
import User from '@/models/User'
import bcrypt from 'bcryptjs'

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    await configDB()
    const { name, email, bio, profileImage, newPassword } = req.body
    const { id } = req.query

    if (!id || !(name || email || bio || profileImage || newPassword)) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    try {
      // Find the user by ID
      const user = await User.findById(id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Update fields if present in the request body
      user.name = name || user.name
      user.email = email || user.email
      user.bio = bio || user.bio
      user.profileImage = profileImage || user.profileImage

      // If password is provided, hash it
      if (newPassword) {
        if (!user.isOAuth) {
          if (!bcrypt.compareSync(newPassword, user.password)) {
            return res.status(400).json({ message: 'Invalid password' })
          }
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashedPassword
      }

      // Save the updated user
      await user.save()

      return res
        .status(200)
        .json({ message: 'User updated successfully', data: user })
    } catch (error) {
      return res.status(500).json({ message: 'Error updating user', error })
    }
  } else {
    console.log(error)
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
