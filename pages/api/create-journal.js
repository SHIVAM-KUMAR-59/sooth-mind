import configDB from '@/app/lib/configDB'
import Journal from '@/models/Journal'

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
      const existingJournal = await Journal.findOne({ title })
      if (existingJournal) {
        return res
          .status(400)
          .json({ success: false, message: 'Journal already exists' })
      }

      const journal = new Journal({
        title,
        description,
        content,
        author: userId,
      })
      await journal.save()

      res.status(201).json({ success: true, data: journal })
    } catch (error) {
      res.status(400).json({ success: false, error: error.message })
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
}
