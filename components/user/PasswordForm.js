import React from 'react'
import { useForm } from 'react-hook-form'

const PasswordForm = ({ onSubmit, samePassword }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  return (
    <form
      className="flex flex-col gap-3 my-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
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
          placeholder="New Password"
          type="password"
          className="w-full p-2 rounded-[5px] bg-[#DFBABA] input focus:outline-none"
          {...register('newPassword', {
            required: true,
            minLength: 8,
            pattern:
              /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
          })}
        />
        {errors.newPassword?.type === 'required' && (
          <p className="text-red-500">New Password is required</p>
        )}
        {errors.newPassword?.type === 'minLength' && (
          <p className="text-red-500">
            Password must be at least 8 characters long
          </p>
        )}
        {errors.newPassword?.type === 'pattern' && (
          <p className="text-red-500">
            Password must have at least one uppercase letter, one number, and
            one special character
          </p>
        )}
      </div>
      <div>
        <input
          placeholder="Confirm New Password"
          type="password"
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
      >
        Update Password
      </button>
    </form>
  )
}

export default PasswordForm
