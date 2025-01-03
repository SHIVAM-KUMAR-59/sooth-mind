import configDB from '@/app/lib/configDB'
import User from '@/models/User'

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ message: 'ID is required' })
  }

  console.log(id)

  try {
    await configDB()
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    return res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error deleting user' })
  }
}
