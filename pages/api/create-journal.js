import configDB from '@/app/lib/configDB'
import { getSentimentAnalysis } from '@/app/lib/huggingFace'
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

      // Get sentiment analysis
      const sentimentResponse = await getSentimentAnalysis(content)

      // Validate the response structure
      if (
        !sentimentResponse ||
        !sentimentResponse.label ||
        !sentimentResponse.score
      ) {
        return res
          .status(500)
          .json({ message: 'Invalid sentiment response format' })
      }

      // Extract sentiment data
      const dominantSentiment = sentimentResponse

      // Prepare chartData (mocked for single sentiment response)
      const chartData = {
        positive:
          dominantSentiment.label === 'POSITIVE' ? dominantSentiment.score : 0,
        neutral:
          dominantSentiment.label === 'NEUTRAL' ? dominantSentiment.score : 0,
        negative:
          dominantSentiment.label === 'NEGATIVE' ? dominantSentiment.score : 0,
      }

      // Create a new journal
      const journal = new Journal({
        title,
        description,
        content,
        sentiment: {
          score: dominantSentiment.score,
          label: dominantSentiment.label,
        },
        chartData,
        author: userId,
      })

      await journal.save()

      // Update the user's journal history
      const user = await User.findById(userId)
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found' })
      }

      user.journalHistory.push(journal._id)
      await user.save()

      res.status(201).json({ success: true, data: journal })
    } catch (error) {
      res.status(400).json({ success: false, error: error.message })
    }
  } else {
    res.status(405).json({ success: false, message: 'Method Not Allowed' })
  }
}
