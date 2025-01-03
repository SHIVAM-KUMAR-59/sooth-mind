import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/router'
import FormInput from '@/components/journal/FormInput'
import MessageBox from '@/components/journal/MessageBox'
import Button from '@/components/journal/Button'
import '@/app/globals.css'
import '@/app/styles.css'
import Link from 'next/link'
import Image from 'next/image'

const CreateJournal = () => {
  const router = useRouter()
  const [session, setSession] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [id, setId] = useState(null)

  const date = Date.now()
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
      // reset()
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#E6E3C4] to-[#BBD5DA] relative flex justify-center items-center">
      <Link href="/" className="text-black">
        <Image src="/Logo.png" width={100} height={100} alt="logo" />
      </Link>
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
            <FormInput
              label="Title"
              placeholder={readableDate}
              register={register}
              errors={errors}
              name="title"
            />
            <FormInput
              label="Description"
              placeholder="What's on your mind today?"
              register={register}
              errors={errors}
              name="description"
              type="textarea"
            />
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
            <Button isPending={isPending}>Save and Generate Analysis</Button>
          </form>
        </div>
      </div>
      {message && (
        <MessageBox
          message={message}
          isError={isError}
          setIsError={setIsError}
          setMessage={setMessage}
          id={id}
        />
      )}
    </main>
  )
}

export default CreateJournal
