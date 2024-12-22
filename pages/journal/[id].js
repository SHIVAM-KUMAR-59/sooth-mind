'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'

const Journal = () => {
  const router = useRouter()
  const { id } = router.query
  const [journal, setJournal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return // Avoid running the effect if `id` is not available

    const getJournal = async () => {
      try {
        const response = await fetch(`/api/get-journal/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch journal')
        }
        const data = await response.json()
        setJournal(data)
      } catch (err) {
        setError(err.message || 'Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    getJournal()
  }, [id]) // Runs when `id` changes

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/delete-journal/${id}`)
      console.log(response)
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!journal) {
    return <div>Journal not found</div>
  }

  return (
    <div>
      <h1>Journal ID: {journal.id}</h1>
      <p>{journal.content}</p>
      <Link href={`/journal/update-journal/${id}`}>Update Journal</Link>
      <button onClick={handleDelete}>Delete Journal</button>
    </div>
  )
}

export default Journal
