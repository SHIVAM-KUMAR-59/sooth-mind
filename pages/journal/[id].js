'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import '@/app/globals.css'
import '@/app/styles.css'

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

    sessionStorage.setItem('journalId', id)

    getJournal()
  }, [id])

  const timestamp = journal?.createdAt
  const dateObj = new Date(timestamp)
  const date = dateObj.toLocaleDateString('en-US')
  const time = dateObj.toLocaleTimeString('en-US')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-[#B8C9E1] to-[#EAF3F5]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-lg text-gray-700">Loading your journal...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!journal) {
    return <div>Journal not found</div>
  }

  return (
    <main className="min-h-screen bg-gradient-to-t from-[#B8C9E1] to-[#EAF3F5] text-black">
      <Link
        href="/"
        className="absolute top-0 left-0 mt-4 ml-4 text-white inter-regular bg-black bg-opacity-35 px-4 py-2 rounded-md text-[20px] hover:scale-105 hover:bg-opacity-70 transition-all duration-200"
      >
        Home
      </Link>
      <section className="w-[95%] xl:w-[70%] mx-auto h-full flex flex-col items-center justify-center gap-2">
        <div className="w-full">
          <h1 className="mt-12 text-[32px] xl:text-[64px] fraunces-semiBold">
            {journal.title}
          </h1>
        </div>
        <div className="text-[18px] xl:text-[28px] poppins-regular w-full">
          <h3>{journal.description}</h3>
        </div>
        <hr className="w-full border-1 border-black my-3" />
        <div className="w-full text-left">
          {/* Render the content with line breaks */}
          {journal.content.split('\n').map((line, index) => (
            <p key={index} className="dm-sans-light text-[15px] xl:text-[22px]">
              {line}
            </p>
          ))}
        </div>
        {timestamp && (
          <div className="w-full text-left xl:text-[18px]">
            <p className="dm-sans-extra-light xl:dm-sans-medium ">
              {date} {time.split('.')[0]}
            </p>
          </div>
        )}

        <div className="w-full xl:w-[30%] bg-black rounded-[8px] text-white inter-medium text-center py-2 my-4 xl:text-[20px] cursor-pointer">
          <Link href={`/journal/${id}/data`}>View Generated Data</Link>
        </div>
      </section>
    </main>
  )
}

export default Journal
