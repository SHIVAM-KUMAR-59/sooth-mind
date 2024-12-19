import mongoose from 'mongoose'

const JournalSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 3,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 10,
      max: 100,
    },
    content: {
      type: String,
      required: true,
      min: 10,
    },
    sentiment: {
      type: String,
      enum: ['Positive', 'Neutral', 'Negative'],
      default: 'Neutral',
    },
    chartData: {
      type: Object,
      default: {}
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    Timestamp: true,
  },
)

const Journal = mongoose.models.Journal || mongoose.model('JournalSchema')

export default Journal
