import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import axios from 'axios'
import { PuffLoader } from 'react-spinners'
import { signOut } from 'next-auth/react'

const DeleteAccount = ({ user }) => {
  const [loading, setLoading] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  const handleDelete = async () => {
    console.log('Account deletion requested for', user.id)
    setLoading(true)

    try {
      const response = await axios.delete(`/api/delete-user/${user.id}`)
      console.log(response.data)
      setLoading(false)
      setShowPopup(true)

      // Log out the user using NextAuth
      signOut({ callbackUrl: '/' })

      // Redirect to the home page after 1 second
      setTimeout(() => {
        window.location.href = '/'
      }, 2500)
    } catch (error) {
      setLoading(false)
      console.error(error)
      alert('Error deleting account')
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h1 className="roboto-bold text-[22px] xl:text-[27px] text-[#E50909] opacity-[70%]">
          Delete Account
        </h1>
        <p className="roboto-regular text-[15px]">
          Once deleted, your account cannot be recovered.
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="roboto-regular bg-[#E50909] hover:bg-red-500 transition-all duration-200 bg-opacity-[70%] rounded-[5px] text-white text-[20px] w-full xl:w-[50%] py-1 flex justify-center items-center gap-2"
        disabled={loading}
      >
        {loading ? (
          <PuffLoader size={20} color="#fff" />
        ) : (
          <>
            <FontAwesomeIcon icon={faTrashCan} />
            Delete Account
          </>
        )}
      </button>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 w-[90%] rounded-lg shadow-lg text-center">
            <h2 className="text-[#E50909] text-[22px] roboto-bold">
              Account Deleted
            </h2>
            <p className="text-gray-600">
              You will be redirected to the home page shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default DeleteAccount
