import configDB from '@/app/lib/configDB'
import { getSentimentAnalysis } from '@/app/lib/huggingFace'
import Journal from '@/models/Journal'
import User from '@/models/User'

export default async function handler(req, res) {
  // Initialize the database connection
  await configDB()

  if (req.method === 'POST') {
    const { title, description, content, userId } = req.body

    // Log incoming request data for debugging
    console.log({ title, description, content, userId })

    // Validate request body
    if (!title || !description || !content || !userId) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            'Missing required fields: title, description, content, or userId',
        })
    }

    try {
      // Check if the journal with the same title already exists
      const existingJournal = await Journal.findOne({ title })
      if (existingJournal) {
        return res
          .status(400)
          .json({
            success: false,
            message: 'A journal with this title already exists',
          })
      }

      // Perform sentiment analysis on the content
      const sentimentResponse = await getSentimentAnalysis(content)

      // Validate the sentiment analysis response structure
      if (
        !sentimentResponse?.label ||
        typeof sentimentResponse.score !== 'number'
      ) {
        return res
          .status(500)
          .json({
            success: false,
            message: 'Failed to retrieve valid sentiment analysis',
          })
      }

      // Determine chart data based on sentiment
      const chartData = {
        positive:
          sentimentResponse.label === 'POSITIVE' ? sentimentResponse.score : 0,
        neutral:
          sentimentResponse.label === 'NEUTRAL' ? sentimentResponse.score : 0,
        negative:
          sentimentResponse.label === 'NEGATIVE' ? sentimentResponse.score : 0,
      }

      // Create a new journal document
      const journal = new Journal({
        title,
        description,
        content,
        sentiment: {
          score: sentimentResponse.score,
          label: sentimentResponse.label,
        },
        chartData,
        author: userId,
      })

      // Save the journal to the database
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

      // Respond with the created journal
      return res.status(201).json({ success: true, data: journal })
    } catch (error) {
      console.error(error) // Log the error for debugging
      return res
        .status(500)
        .json({
          success: false,
          message: 'An unexpected error occurred',
          error: error.message,
        })
    }
  } else {
    // Handle unsupported HTTP methods
    return res
      .status(405)
      .json({ success: false, message: 'Method Not Allowed' })
  }
}
