import User from '@/models/User'

export default async function handler(req, res) {
  const { id } = req.query
  console.log(id)

  if (!id) {
    return res.status(400).json({ error: 'ID is required' })
  }

  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}
