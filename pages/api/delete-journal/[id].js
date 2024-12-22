import Journal from '@/models/Journal'

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const { id } = req.query
    if (!id) {
      return res.status(400).json({ message: 'ID is required' })
    }

    try {
      await Journal.findByIdAndDelete(id)

      return res.status(200).json({ message: 'Journal deleted successfully' })
    } catch (error) {
      console.error('Error fetching journal:', error)
      return res.status(500).json({ message: 'Internal Server Error' })
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}
