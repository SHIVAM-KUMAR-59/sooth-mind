import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'

const DeleteAccount = () => {
  const handleDelete = () => {
    // Logic for account deletion
    console.log('Account deletion requested')
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
      >
        <FontAwesomeIcon icon={faTrashCan} />
        Delete Account
      </button>
    </div>
  )
}

export default DeleteAccount
