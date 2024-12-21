import configDB from '@/app/lib/configDB'
import Journal from '@/models/Journal'

export default async function handler(req, res) {
  const { id } = req.query // Using req.query instead of req.params

  if (!id) {
    return res.status(400).json({ message: 'ID is required' })
  }

  try {
    await configDB()

    const journal = await Journal.findById(id)
    if (!journal) {
      return res.status(404).json({ message: 'Journal not found' })
    }

    return res.status(200).json(journal)
  } catch (error) {
    console.error('Error fetching journal:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
