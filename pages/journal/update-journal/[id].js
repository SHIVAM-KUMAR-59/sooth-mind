'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import { useForm } from 'react-hook-form'

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

  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(`/api/update-journal/${id}`, data)
      console.log(response)

      if (response.status === 200) {
        alert('Journal updated successfully')
        router.push(`/journal/${id}`)
      } else {
        throw new Error('Failed to update journal')
      }
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          defaultValue={journal.title}
          {...register('title')}
        />
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={journal.description}
          {...register('description')}
        />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          defaultValue={journal.content}
          {...register('content')}
        ></textarea>
        <button type="submit">Update Journal</button>
      </form>
    </div>
  )
}

export default Journal
