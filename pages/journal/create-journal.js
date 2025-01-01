import '@/app/styles.css'
import '@/app/globals.css'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const CreateJournal = () => {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [id, setId] = useState(null)

  const date = Date.now() // Get current timestamp
  const readableDate = new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  useEffect(() => {
    if (router.query.session) {
      setSession(JSON.parse(router.query.session))
    }
  }, [router.query.session])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      setIsPending(true)
      data.userId = session
      const response = await axios.post('/api/create-journal', data)
      setId(response.data.data._id)

      if (response.status === 201) {
        setMessage('Journal created successfully')
      } else {
        setIsError(true)
        setMessage('Error creating journal')
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setIsError(true)
        setMessage(error.response.data.message)
      } else {
        setIsError(true)
        setMessage('An unexpected error occurred')
      }
    } finally {
      setIsPending(false)
      reset()
    }
  }

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#E6E3C4] to-[#BBD5DA] relative flex justify-center items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-[30px] fraunces-semiBold text-black mt-6 md:text-[60px]">
              Convey Your Feelings
            </h1>
          </div>
          <div className="w-[92%] md:w-[80%] xl:w-[70%] mx-auto mt-8">
            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col w-full">
                <div className="flex w-full items-center justify-between">
                  <label className="w-[30%] text-[18px] md:text-[28px] inter-soft text-black">
                    Title:
                  </label>
                  <input
                    placeholder={readableDate}
                    className="w-[70%] px-2 py-1 md:py-2 rounded-[8px] bg-[#FFF7F7] text-black text-[15px] md:text-[18px] focus:outline-none"
                    {...register('title', {
                      required: 'Title cannot be empty',
                    })}
                  />
                </div>
                {errors.title && (
                  <p className="ml-1 inter-regular text-red-500 mt-2 md:text-[20px]">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col justify-between w-full mt-2">
                <div className="flex">
                  <label className="w-[30%] text-[18px] md:text-[28px] inter-soft text-black">
                    Description:
                  </label>
                  <textarea
                    placeholder="What's on your mind today?"
                    className="w-[70%] px-2 py-1 md:py-2 rounded-[8px] bg-[#FFF7F7] text-black text-[15px] md:text-[18px] focus:outline-none"
                    rows={4}
                    {...register('description', {
                      required: 'Description cannot be empty',
                    })}
                  />
                </div>
                {errors.description && (
                  <p className="ml-1 inter-regular text-red-500 mt-2 md:text-[20px]">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full gap-2 mt-2">
                <label className="text-[18px] md:text-[28px] inter-soft text-black">
                  Write Today's Entry:
                </label>
                <textarea
                  placeholder="How are you feeling today?"
                  className="w-[100%] px-2 py-1 md:py-2 rounded-[8px] bg-[#FFF7F7] text-black focus:outline-none text-[15px] md:text-[20px]"
                  rows={10}
                  {...register('content', {
                    required: 'Entry cannot be empty',
                  })}
                />
                {errors.content && (
                  <p className="ml-1 inter-regular text-red-500 mt-2 md:text-[20px]">
                    {errors.content.message}
                  </p>
                )}
              </div>
              <button
                className="bg-gradient-to-t to-[#0F0E0E] from-[#5C5656] text-white inter-medium rounded-[5px] text-[20px] md:text-[25px] w-full md:w-[55%] xl:w-[40%] self-end py-2"
                type="submit"
              >
                {isPending ? 'Saving...' : 'Save and Generate Analysis'}
              </button>
            </form>
          </div>
        </div>
        {message && (
          <div className="w-[65%] xl:w-[30%] bg-black bg-opacity-80 absolute text-center p-4 inter-medium flex flex-col items-center justify-center gap-4 rounded-lg text-[20px] md:text-[30px]">
            <div>{message}</div>
            <div className="w-[90%] flex flex-col items-center justify-center">
              {isError ? (
                <button
                  className="text-white bg-slate-400 py-2 block w-full rounded-[8px] text-[20px] md:text-[25px] cursor-pointer"
                  onClick={() => {
                    setIsError(false)
                    setMessage(null)
                  }}
                >
                  Retry
                </button>
              ) : (
                <Link
                  href={id ? `/journal/${id}` : '/'}
                  className="text-white bg-slate-400 py-2 block w-full rounded-[8px] text-[20px] md:text-[25px] cursor-pointer"
                >
                  View Journal
                </Link>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default CreateJournal
