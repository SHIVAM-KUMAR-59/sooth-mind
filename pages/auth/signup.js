import { useState } from 'react'
import { useForm } from 'react-hook-form'
import '../../app/globals.css'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Layout from './layout'
import GoogleSignupButton from '@/components/auth/GoogleSignupButton'
import Link from 'next/link'
import InputField from '@/components/auth/InputField'
import HelpText from '@/components/auth/HelpText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const router = useRouter()

  const onSubmit = async (data) => {
    setIsLoading(true)
    setError('') // Clear previous errors

    const result = await signIn('credentials', {
      name: data.name,
      email: data.email,
      password: data.password,
    })

    setIsLoading(false)
    reset()

    if (result?.ok) {
      router.push('/')
    } else if (result?.error) {
      setError(result.error)
    }
  }
  return (
    <Layout type={'signup'}>
      <div className="w-[90%] xl:w-[50%] h-full mx-auto pb-2 relative">
        <form
          className="flex flex-col gap-1 justify-center items-center w-[90%] xl:w-full mx-auto mt-2 text-black"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            name="name"
            label="Name"
            placeholder="John Snow"
            register={register}
            message="Name is required"
            errors={errors}
            validationRules={{ required: 'Name is required' }}
          />
          <InputField
            name="username"
            label="Username"
            placeholder="John Snow"
            register={register}
            message="Username is required"
            errors={errors}
            validationRules={{ required: 'Username is required' }}
          />

          <InputField
            name="email"
            label="Email"
            register={register}
            errors={errors}
            placeholder={'example@gmail.com'}
            message="Email is required"
            validationRules={{ required: 'Email is required' }}
          />
          <InputField
            name="password"
            label="Password"
            type="password"
            placeholder="equeqSASxibkabc@1anckc"
            register={register}
            errors={errors}
            validationRules={{
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              maxLength: {
                value: 20,
                message: 'Password cannot exceed 20 characters',
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
                message:
                  'Password must include uppercase, lowercase, number, and special character',
              },
            }}
          />

          <button
            className="bg-[#A7A68A] w-[95%] xl:w-[70%] mx-auto rounded-[8px] py-2 text-[22px] mt-3 inter-medium flex items-center justify-center gap-2 hover:bg-[#b2af8c] hover:shadow-md transition-all duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
            {!isLoading && <FontAwesomeIcon icon={faArrowRight} />}
          </button>
        </form>
        {errors && (
          <p className="text-center text-red-500 mt-4 poppins-light">{error}</p>
        )}
        <HelpText
          text="Already Have an Account? Signin"
          link="/auth/signin"
          margin="my-0"
          position="center"
        />
        <hr className="my-4 border-1 xl:border-3 border-[rgba(0,0,0,0.3)]" />
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

export default Signup
