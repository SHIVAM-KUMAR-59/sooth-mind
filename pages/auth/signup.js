

import { useForm } from 'react-hook-form'
import '../../app/globals.css'
import InputField from '../../components/InputField'
import Link from 'next/link'
import axios from 'axios'

const Signup = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try{
      const response = await axios.post('/api/register', data)

      if(response.status === 200){
        alert('User registere Successfully')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message || 'An error occurred');
      } else {
        alert('An error occurred');
      }
    }finally{
      reset()
    }
  }

  return (
    <>
      <h1 className="text-3xl text-center mt-20"> Register</h1>
      <form
        className="flex flex-col gap-10 max-w-[600px] mx-auto p-4 border-2 mt-20 rounded-lg text-black"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          className="p-3 rounded-lg mx-auto bg-slate-500 text-black text-2xl w-[80%]"
          type="submit"
        >
          Submit
        </button>
        <Link href="/auth/signin" className="text-white cursor-pointer text-md">Already Have a account?</Link>
      </form>
    </>
  )
}

export default Signup
