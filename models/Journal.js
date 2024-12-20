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
      score: {
        type: Number,
        required: true, // Sentiment score ranges from -1 to 1
        default: 0,
      },
      magnitude: {
        type: Number,
        required: true, // Magnitude indicates the strength of sentiment
        default: 0,
      },
      label: {
        type: String,
        enum: ['Positive', 'Neutral', 'Negative'],
        default: 'Neutral',
      },
    },
    chartData: {
      type: Object,
      default: {},
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

const Journal =
  mongoose.models.Journal || mongoose.model('Journal', JournalSchema)

export default Journal
