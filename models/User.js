import mongoose from 'mongoose'

const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
  },
  profileImage: {
    type: String,
  },
  bio: {
    type: String,
  },
  journalHistory: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Journal',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('User', User)
