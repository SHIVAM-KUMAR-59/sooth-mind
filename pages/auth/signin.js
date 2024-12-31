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
import Image from 'next/image'

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
      <div className="w-[90%] xl:w-[50%] h-full mx-auto pb-2 relative">
        <form className="flex flex-col gap-3 justify-center items-center w-[90%] xl:w-full  mx-auto mt-6 text-black">
          <div className="flex flex-col w-[95%] xl:w-[70%] mx-auto mt-2">
            <label className="ml-1 inter-regular ">Email</label>
            <input
              placeholder="example@gmail.com"
              className="p-2 rounded-[8px]"
            />
            <p className="ml-1 inter-regular text-red-500 mt-2">
              Error..........
            </p>
          </div>
          <div className="flex flex-col w-[95%] xl:w-[70%] mx-auto mt-2">
            <label className="ml-1 inter-regular ">Email</label>
            <input
              placeholder="example@gmail.com"
              className="p-2 rounded-[8px]"
            />
            <p className="ml-1 inter-regular text-red-500 mt-2">
              Error..........
            </p>
          </div>
          <p className="w-full xl:w-[70%] text-right px-2 xl:px-0 underline poppins-extralight cursor-pointer">
            Forgot Password?
          </p>
          <button
            className="bg-[#A7A68A] w-[95%] xl:w-[70%] mx-auto rounded-[8px] py-2 text-[22px] mt-3 inter-medium flex items-center justify-center gap-2 hover:bg-[#b2af8c] hover:shadow-md transition-all duration-200"
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
        <hr className="my-4 border-1 xl:border-3 border-[rgba(0,0,0,0.3)]"></hr>
        <GoogleSignupButton />
      </div>
      <div
        className="w-[45%] hidden xl:flex justify-center items-center bg-[url('/Login.png')]"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
    </Layout>
  )
}

export default Signin
