import { useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../app/globals.css'
import InputField from '../../components/InputField'
import Link from 'next/link'
import axios from 'axios'
import GoogleSignupButton from '@/components/GoogleSignupButton'

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await axios.post('/api/signup', data)

      if (response.status === 200) {
        alert('User registered successfully')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'An error occurred')
      } else {
        alert('An error occurred')
      }
    } finally {
      setIsLoading(false)
      reset()
    }
  }

  return (
    <>
      <h1 className="text-3xl text-center mt-20">Register</h1>
      <form
        className="flex flex-col gap-10 max-w-[600px] mx-auto p-4 border-2 mt-20 rounded-lg text-black relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-white"></div>
          </div>
        )}

        <InputField
          label="name"
          type="text"
          placeholder="name"
          register={register}
          validation={{ required: 'Name is required' }}
          error={errors.name}
        />

        <InputField
          label="username"
          type="text"
          placeholder="username"
          register={register}
          validation={{ required: 'Username is required' }}
          error={errors.username}
        />

        <InputField
          label="email"
          type="email"
          placeholder="email"
          register={register}
          validation={{
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Invalid email address',
            },
          }}
          error={errors.email}
        />

        <InputField
          label="password"
          type="password"
          placeholder="password"
          register={register}
          validation={{
            required: 'Password is required',
            min: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message:
                'Password must contain at least one uppercase letter and one special character',
            },
          }}
          error={errors.password}
        />

        <button
          className={`p-3 rounded-lg mx-auto text-2xl w-[80%] ${
            isLoading ? 'bg-gray-400' : 'bg-slate-500'
          }`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>

        {/* Google Signup Option */}
        <GoogleSignupButton />

        <Link href="/auth/signin" className="text-white cursor-pointer text-md">
          Already Have an account?
        </Link>
      </form>
    </>
  )
}

export default Signup
