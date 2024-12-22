import Journal from '@/models/Journal'

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({ message: 'ID is required' })
    }

    try {
      const journal = await Journal.findById(id)
      if (!journal) {
        return res.status(404).json({ message: 'Journal not found' })
      }

      if (req.body.length <= 0) {
        return res.status(400).json({ message: 'No data provided' })
      }

      journal.title = req.body.title || journal.title
      journal.description = req.body.description || journal.description
      journal.content = req.body.content || journal.content

      await journal.save()

      return res.status(200).json(journal)
    } catch (error) {
      console.error('Error fetching journal:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
