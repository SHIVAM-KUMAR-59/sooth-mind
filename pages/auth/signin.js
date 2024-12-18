import { useForm } from 'react-hook-form'
import '../../app/globals.css'
import InputField from '@/components/InputField'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import GoogleSignupButton from '@/components/GoogleSignupButton'

const Signin = () => {
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
      const response = await axios.post('/api/auth/signin', data) // Ensure this matches the API route

      if (response.status === 200) {
        alert('User Logged In successfully')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'An error occurred')
      } else {
        console.log(error)
        alert('An error occurred')
      }
    } finally {
      setIsLoading(false)
      reset()
    }
  }

  return (
    <>
      <h1 className="text-3xl text-center mt-20">Signin</h1>
      <form
        className="flex flex-col gap-10 max-w-[600px] mx-auto p-4 border-2 mt-20 rounded-lg text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center rounded-lg">
            <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-white"></div>
          </div>
        )}
        <InputField
          label="email"
          type="text"
          placeholder="email"
          register={register}
          validation={{ required: 'Email is required' }}
          error={errors.email}
        />
        <InputField
          label="password"
          type="password"
          placeholder="password"
          register={register}
          validation={{
            required: 'Password is required',
            minLength: {
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
        <div className="w-[80%] mx-auto -mt-8 text-right">
          <Link
            href="/auth/forgotpassword"
            prefetch={false}
            className="text-red-500 cursor-pointer text-md"
          >
            Forgot Password
          </Link>
        </div>
        <button
          className="p-3 rounded-lg mx-auto bg-slate-500 text-black text-2xl w-[80%]"
          type="submit"
        >
          Submit
        </button>
        <GoogleSignupButton />
      </form>
    </>
  )
}

export default Signin
