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
      <div className="w-[90%] h-full border-2 border-white mx-auto py-2">
        <h1 className="text-center text-[32px] fraunces-semiBold mt-2 text-black">
          Welcome Back
        </h1>
        <p className="text-center text-[22px] text-black dm-sans-light mt-2">
          Pause, Reflect, Heal
        </p>
      </div>
    </Layout>
  )
}

export default Signin
