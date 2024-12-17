import mongoose from 'mongoose'

const Journal = mongoose.Schema({
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
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.model('Journal', Journal)
