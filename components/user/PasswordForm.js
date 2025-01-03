import React from 'react'
import { useForm } from 'react-hook-form'

const PasswordForm = ({ onSubmit, samePassword, loading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleFormSubmit = (data) => {
    onSubmit(data, reset) // Pass the reset function to the parent component
  }

  return (
    <form
      className="flex flex-col gap-3 my-2"
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <div>
        <input
          type="password"
          placeholder="Current Password"
          className="w-full p-2 rounded-[5px] bg-[#DFBABA] input focus:outline-none"
          {...register('currentPassword', { required: true })}
        />
        {errors.currentPassword && (
          <p className="text-red-500">Current Password is required</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 rounded-[5px] bg-[#DFBABA] input focus:outline-none"
          {...register('newPassword', {
            required: true,
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters',
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              message:
                'Password must include at least 1 uppercase, 1 number, and 1 special character',
            },
          })}
        />
        {errors.newPassword && (
          <p className="text-red-500">{errors.newPassword.message}</p>
        )}
      </div>
      <div>
        <input
          type="password"
          placeholder="Confirm New Password"
          className="w-full p-2 rounded-[5px] bg-[#DFBABA] input focus:outline-none"
          {...register('confirmPassword', { required: true })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">Confirm Password is required</p>
        )}
      </div>
      {samePassword && <p className="text-red-500">{samePassword}</p>}
      <button
        className="w-full xl:w-[50%] py-1 text-white bg-[#444444] inter-medium text-[22px] rounded-[5px] hover:bg-[#333333] transition-all duration-200"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>
    </form>
  )
}

export default PasswordForm
