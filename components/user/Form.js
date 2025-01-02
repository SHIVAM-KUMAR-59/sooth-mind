import React, { useEffect, useState } from 'react'
import Input from './Input'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons'
import { useForm } from 'react-hook-form'
import axios from 'axios'

const Form = ({ user }) => {
  console.log(user.id)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()
  const [initialValues, setInitialValues] = useState({})
  const [error, setError] = useState(null) // State for error message
  const [isLoading, setIsLoading] = useState(false) // State for loading
  const [successMessage, setSuccessMessage] = useState(null) // State for success popup

  useEffect(() => {
    setInitialValues({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
    })

    setValue('name', user?.name || '')
    setValue('email', user?.email || '')
    setValue('bio', user?.bio || '')
  }, [user, setValue])

  const onSubmit = async (data) => {
    const changedValues = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== initialValues[key]) {
        acc[key] = data[key]
      }
      return acc
    }, {})

    setIsLoading(true) // Start loading state
    console.log('changedValues', changedValues)

    try {
      const response = await axios.patch(
        `/api/update-user/${user.id}`,
        changedValues,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      console.log(response)
      setError(null) // Reset error state on successful API call
      setSuccessMessage('Profile Updated Successfully') // Show success popup
    } catch (error) {
      console.log(error)
      setError(error.response.data.message) // Set error state if API call fails
    } finally {
      setIsLoading(false) // End loading state
    }
  }

  const handleErrorDismiss = () => {
    setError(null) // Reset error state when the button is clicked
  }

  const handleSuccessDismiss = () => {
    setSuccessMessage(null) // Reset success message when dismissed
  }

  return (
    <div className="relative w-full xl:w-[50%]">
      {error && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-[8px] shadow-lg flex flex-col justify-between items-center w-[90%] gap-2">
          <span>{error}</span>
          <button
            onClick={handleErrorDismiss}
            className="bg-white text-black py-1 px-2 rounded-[8px] ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {successMessage && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-[8px] shadow-lg flex flex-col justify-between items-center w-[90%] gap-2">
          <span>{successMessage}</span>
          <button
            onClick={handleSuccessDismiss}
            className="bg-white text-black py-1 px-2 rounded-[8px] ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      <form
        className="w-full flex flex-col justify-center items-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          value={user?.name}
          placeholder="Enter your name"
          icon={faUser}
          type="text"
          name="name"
          register={register}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <Input
          value={user?.email}
          placeholder="Enter your email"
          icon={faEnvelope}
          type="email"
          name="email"
          register={register}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <Input
          value={user?.bio}
          placeholder="Enter your bio"
          icon={faPen}
          type="text"
          name="bio"
          register={register}
        />
        {errors.bio && (
          <span className="text-red-500">{errors.bio.message}</span>
        )}

        <button
          type="submit"
          className="bg-[#FEFEFE] inter-medium text-[20px] rounded-[8px] py-2 px-3 self-end hover:shadow-md transition-all duration-200 hover:-translate-y-1"
        >
          {isLoading ? (
            <span>Saving...</span> // Show loading text
          ) : (
            'Save Profile'
          )}
        </button>
      </form>
    </div>
  )
}

export default Form
