import Journal from '@/models/Journal'
import User from '@/models/User'

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id, userId } = req.body
    if (!id || !userId) {
      return res.status(400).json({ message: 'ID is required' })
    }

    try {
      const journal = await Journal.findById(id)
      const user = await User.findById(userId)

      if (!journal || !user) {
        return res.status(404).json({ message: 'Journal or user not found' })
      }

      if (journal.userId.toString() !== userId) {
        return res
          .status(403)
          .json({ message: 'You are not authorized to delete this journal' })
      }
      user.journalHistory.pull(journal._id)
      await user.save()
      await journal.deleteOne()

      return res.status(200).json({ message: 'Journal deleted successfully' })
    } catch (error) {
      console.error('Error fetching journal:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
