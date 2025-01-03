import React, { useState } from 'react'
import PasswordForm from './PasswordForm'
import DeleteAccount from './DeleteAccount'
import axios from 'axios'
import { ClipLoader } from 'react-spinners'

const Settings = ({ user }) => {
  const [samePassword, setSamePassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const [statusMessage, setStatusMessage] = useState(null)
  const [showSpinner, setShowSpinner] = useState(false)

  const onSubmit = async (data, reset) => {
    const { currentPassword, newPassword, confirmPassword } = data

    if (currentPassword === newPassword) {
      setSamePassword('Current Password and New Password should not be same')
    } else if (newPassword !== confirmPassword) {
      setSamePassword(
        'New Password and Confirm New Password should be the same',
      )
    } else {
      setSamePassword(null)
      setLoading(true)
      setStatusMessage(null)

      try {
        const response = await axios.patch(`/api/update-user/${user.id}`, data)
        setStatusMessage('Password updated successfully!')
        setShowSpinner(true)

        // Reset the form fields
        reset()

        // Hide the success message and spinner after 5 seconds
        setTimeout(() => {
          setStatusMessage(null)
          setShowSpinner(false)
        }, 1000)
      } catch (error) {
        setStatusMessage('An error occurred while updating the password.')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <section className="w-[95%] xl:w-[50%] mx-auto flex flex-col gap-3">
      <div>
        <h1 className="roboto-bold text-[20px] xl:text-[25px]">
          Change Password
        </h1>
      </div>
      <PasswordForm
        onSubmit={onSubmit}
        samePassword={samePassword}
        loading={loading}
      />
      {loading && (
        <div className="flex justify-center my-3">
          <ClipLoader size={35} color="#444444" />
        </div>
      )}
      {statusMessage && (
        <div className="flex items-center justify-center gap-2">
          <p
            className={`text-center ${
              statusMessage.includes('successfully')
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {statusMessage}
          </p>
          {showSpinner && <ClipLoader size={20} color="#444444" />}
        </div>
      )}
      <div>
        <hr className="border-[1.2px] border-[rgb(0,0,0,0.2)]" />
      </div>
      <DeleteAccount user={user} />
    </section>
  )
}

export default Settings
