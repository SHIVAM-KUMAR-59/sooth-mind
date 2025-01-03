import React, { useState } from 'react'
import PasswordForm from './PasswordForm'
import DeleteAccount from './DeleteAccount'

const Settings = ({ user }) => {
  const [samePassword, setSamePassword] = useState(null)

  const onSubmit = (data) => {
    const { currentPassword, newPassword, confirmPassword } = data

    if (currentPassword === newPassword) {
      setSamePassword('Current Password and New Password should not be same')
    } else if (newPassword !== confirmPassword) {
      setSamePassword(
        'New Password and Confirm New Password should be the same',
      )
    } else {
      setSamePassword(null)
      // Proceed with password update logic
      console.log('Password updated successfully:', data)
    }
  }

  return (
    <section className="w-[95%] xl:w-[50%] mx-auto flex flex-col gap-3">
      <div>
        <h1 className="roboto-bold text-[20px] xl:text-[25px]">
          Change Password
        </h1>
      </div>
      <PasswordForm onSubmit={onSubmit} samePassword={samePassword} />
      <div>
        <hr className="border-[1.2px] border-[rgb(0,0,0,0.2)]" />
      </div>
      <DeleteAccount />
    </section>
  )
}

export default Settings
