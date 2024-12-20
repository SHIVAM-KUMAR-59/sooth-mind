import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import InputField from '@/components/InputField'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  // Sanitize the session object
  const sanitizedSession = {
    ...session,
    user: {
      ...session.user,
      id: session.user.id?.toString() || null, // Convert ObjectId to string
      image: session.user.image || null, // Replace undefined with null
    },
  }

  return {
    props: { session: sanitizedSession },
  }
}

const CreateJournal = ({ session }) => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    setIsLoading(true)

    console.log(data)

    setIsLoading(false)
    reset()
  }
  return (
    <div>
      <h1>Create Journal</h1>
      <p>Welcome, {session.user.name}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="title"
          type="text"
          placeholder="Enter your title"
          register={register}
          validation={{ required: 'Title is required' }}
          error={errors.email}
        />
        <InputField
          label="description"
          type="text"
          placeholder="Enter your description"
          register={register}
          validation={{ required: 'Description is required' }}
          error={errors.email}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateJournal
