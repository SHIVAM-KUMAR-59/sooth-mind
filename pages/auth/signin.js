import Layout from './layout'
import { useForm } from 'react-hook-form'
import '../../app/globals.css'
import InputField from '@/components/InputField'
import Link from 'next/link'
import { useState } from 'react'
import GoogleSignupButton from '@/components/GoogleSignupButton'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import '@/app/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

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
      <div className="w-[90%] h-full mx-auto py-2">
        <h1 className="text-center text-[32px] fraunces-semiBold mt-2 text-black">
          Welcome Back
        </h1>
        <p className="text-center text-[22px] text-black dm-sans-light mt-2">
          Pause, Reflect, Heal
        </p>
        <form className="flex flex-col gap-3 justify-center items-center w-[90%] mx-auto mt-6 text-black">
          <div className="flex flex-col w-[95%] mx-auto mt-2">
            <label className="ml-1 inter-regular ">Email</label>
            <input
              placeholder="example@gmail.com"
              className="p-2 rounded-[8px]"
            />
            <p className="ml-1 inter-regular text-red-500 mt-2">
              Error..........
            </p>
          </div>
          <div className="flex flex-col w-[95%] mx-auto mt-2">
            <label className="ml-1 inter-regular ">Email</label>
            <input
              placeholder="example@gmail.com"
              className="p-2 rounded-[8px]"
            />
            <p className="ml-1 inter-regular text-red-500 mt-2">
              Error..........
            </p>
          </div>
          <p className="w-full text-right px-2 underline poppins-extralight">
            Forgot Password?
          </p>
          <button
            className="bg-[#A7A68A] w-[95%] mx-auto rounded-[8px] py-2 text-[22px] mt-3 inter-medium flex items-center justify-center gap-2"
            type="submit"
            onClick={() => console.log('Clicked')}
          >
            Submit
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </form>
        <div className="w-[90%] mx-auto text-center my-3 poppins-light text-[16px] text-black">
          <Link
            href={'/auth/signup'}
            className="underline text-center poppins-extralight"
          >
            Don't Have an Account? Signup
          </Link>
        </div>
        <hr className="my-4 border-1 border-[rgba(0,0,0,0.3)]"></hr>
        <GoogleSignupButton />
      </div>
    </Layout>
  )
}

export default Signin
