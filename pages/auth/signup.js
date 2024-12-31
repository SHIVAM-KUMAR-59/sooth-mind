import { useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../app/globals.css'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from './layout'
import InputField from '@/components/InputField'
import GoogleSignupButton from '@/components/GoogleSignupButton'
import Link from 'next/link'

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      username: data.username,
      name: data.name,
    })

    setIsLoading(false)
    reset()
    if (result.ok) {
      router.push('/')
    }

    if (result?.error) {
      alert('Error: ' + result.error)
    }
  }
  return (
    <Layout type={'signup'}>
      <main className="min-h-screen w-full flex items-center justify-center p-5">
        <div className="w-full sm:w-4/5 md:w-3/5 lg:w-[80%] mx-auto flex flex-col sm:flex-row gap-6 sm:gap-3">
          {/* Left Column */}
          <div className="w-full sm:w-1/2">
            <div className="py-3 mx-auto sm:w-[83%]  sm:text-left">
              <h1 className="text-[#4B8652] text-[40px] sm:text-[50px] font-[700] capitalize">
                Welcome Back!
              </h1>
              <p className="text-[#8661A8] text-[28px] font-[500] mt-5">
                Rekindle, Reflect, Rejuvenate
              </p>
            </div>

            <form
              className="flex flex-col sm:gap-10 gap-2 sm:mt-4 w-full sm:w-[95%] mx-auto sm:p-2"
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
                    value:
                      /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    message:
                      'Password must contain at least one uppercase letter and one special character',
                  },
                }}
                error={errors.password}
              />
              <button
                className={`sm:p-6 p-2 flex justify-center gap-3 items-center rounded-[50px] text-xl sm:text-2xl w-full sm:w-[83%] text-black bg-slate-400 border-[2px] border-black  ${
                  isLoading ? 'bg-gray-400' : 'bg-slate-500'
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
              <hr className="h-[3px] bg-[#647D91] border-0 sm:w-[83%] " />
              {/* Google Signup Option */}
              <GoogleSignupButton />
              <Link
                href="/auth/signin"
                className="text-blue-700 cursor-pointer text-md"
              >
                Already Have an account?
              </Link>
            </form>
          </div>

          {/* Right Column (Image) */}
          <div
            className="w-full sm:w-1/2 rounded-[20px] bg-cover bg-center"
            style={{
              backgroundImage: "url('/Login.png')",
            }}
          ></div>
        </div>
      </main>
    </Layout>
  )
}

export default Signup
