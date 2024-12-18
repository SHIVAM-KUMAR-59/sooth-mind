'use client' // Ensures this component runs only on the client side

import { useForm } from 'react-hook-form'
import '../../app/globals.css'
import InputField from '@/components/InputField'
import Link from 'next/link'

const Signin = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    reset()
  }

  return (
    <>
      <h1 className="text-3xl text-center mt-20">Signin</h1>
      <form
        className="flex flex-col gap-10 max-w-[600px] mx-auto p-4 border-2 mt-20 rounded-lg text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField
          label="username"
          type="text"
          placeholder="username"
          register={register}
          validation={{ required: 'Username is required' }}
          error={errors.username}
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
      </form>
    </>
  )
}

export default Signin
