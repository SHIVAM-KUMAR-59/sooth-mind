import configDB from '@/app/lib/configDB'
import Journal from '@/models/Journal'
import User from '@/models/User'

export default async function handler(req, res) {
  await configDB()

  if (req.method === 'POST') {
    const { title, description, content, userId } = req.body

    if (!title || !description || !content || !userId) {
      return res
        .status(400)
        .json({ success: false, message: 'Missing required fields' })
    }

    try {
      // Check if the journal already exists
      const existingJournal = await Journal.findOne({ title })
      if (existingJournal) {
        return res
          .status(400)
          .json({ success: false, message: 'Journal already exists' })
      }

      // Create a new journal
      const journal = new Journal({
        title,
        description,
        content,
        author: userId,
      })
      await journal.save()

      // Update the user's journalHistory to include the new journal
      const user = await User.findById(userId)
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found' })
      }

      // Push the new journalId to the user's journalHistory
      user.journalHistory.push(journal._id)
      await user.save()

      res.status(201).json({ success: true, data: journal })
    } catch (error) {
      console.error('Error creating journal:', error)
      res.status(400).json({ success: false, error: error.message })
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
}
