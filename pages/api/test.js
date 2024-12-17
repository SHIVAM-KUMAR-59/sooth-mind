import configDB from '../../app/lib/configDB'

export default async function testDB(req, res) {
  try {
    // Connect to the database
    await configDB()

    console.log('Connected to Database')
    res.status(200).json({ message: 'Database connection successful' })
  } catch (error) {
    console.error('Error connecting to Database:', error)
    res
      .status(500)
      .json({ message: 'Database connection failed', error: error.message })
  }
}
