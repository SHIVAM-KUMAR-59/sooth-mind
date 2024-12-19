import Layout from './layout'
import { useForm } from 'react-hook-form'
import '../../app/globals.css'
import InputField from '@/components/InputField'
import Link from 'next/link'
import { useState } from 'react'
import GoogleSignupButton from '@/components/GoogleSignupButton'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'

const Signin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    setIsLoading(true)
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
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
    <Layout>
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
              {isLoading && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center rounded-lg">
                  <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-t-transparent border-white"></div>
                </div>
              )}

              {/* Input Fields */}
              <InputField
                label="email"
                type="text"
                placeholder="Enter Email"
                register={register}
                validation={{ required: 'Email is required' }}
                error={errors.email}
              />
              <div>
                <InputField
                  label="password"
                  type="password"
                  placeholder="Enter Password"
                  register={register}
                  validation={{
                    required: 'Password is required',
                    minLength: {
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
                <div className="sm:w-[83%] p-2 sm:text-xl text-right hover:underline">
                  <Link
                    href="/auth/forgotpassword"
                    prefetch={false}
                    className="text-[#8661A8] cursor-pointer text-md"
                  >
                    Forgot Password ?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                className="p-5 bg-[#4B8652] border-[3px] border-[#FFF8F2] text-[#FFFFFF] text-[20px] sm:text-[28px] font-[600] sm:w-[83%]  rounded-[50px]"
                type="submit"
              >
                LOGIN
              </button>

              {/* Divider */}
              <hr className="h-[3px] bg-[#647D91] border-0 sm:w-[83%] " />

              {/* Google Signup Button */}
              <GoogleSignupButton />
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

export default Signin
