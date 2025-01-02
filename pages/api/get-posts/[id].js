import configDB from '@/app/lib/configDB'
import User from '@/models/User'
import Journal from '@/models/Journal'

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ message: 'ID is required' })
  }

  try {
    await configDB()

    // Populate the journalHistory with only title and description fields from the Journal model
    const user = await User.findById(id).populate({
      path: 'journalHistory',
      select: 'title description', // Only select the title and description fields
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
