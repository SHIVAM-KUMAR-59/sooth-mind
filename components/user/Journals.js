import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Card from './Card'
import { ClipLoader } from 'react-spinners'

const Journals = ({ user }) => {
  const { id } = user || {}
  const [journals, setJournals] = useState(null)

  const getJournals = async () => {
    if (!id) {
      console.error('User ID is not defined')
      return
    }

    try {
      const response = await axios.get(`/api/get-posts/${id}`)
      const journalHistory = response.data.journalHistory
      setJournals(journalHistory)
    } catch (error) {
      console.error('Error fetching journals:', error)
    }
  }

  useEffect(() => {
    getJournals()
  }, [id])

  if (!journals) {
    return (
      <div className="flex justify-center items-center w-full h-[300px]">
        <ClipLoader size={50} color="#4d4c4c" loading={true} />{' '}
      </div>
    )
  }

  return (
    <div className="w-[95%] min-h-[400px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 xl:gap-4">
      {journals.length > 0 ? (
        journals.map((journal) => <Card key={journal._id} journal={journal} />)
      ) : (
        <>
          <p className="text-[20px] w-full text-center">
            No journals available
          </p>
          <Link
            href="/journal/create-journal"
            className="text-[20px] p-3 mt-3 rounded-[8px] bg-[#4d4c4c] text-white inter-regular"
          >
            Create a new journal
          </Link>
        </>
      )}
    </div>
  )
}

export default Journals
