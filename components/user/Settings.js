import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Settings = ({ user }) => {
  console.log(user.id)

  return (
    <>
      <section className="w-[95%] xl:w-[50%] mx-auto flex flex-col gap-3">
        <div>
          <h1 className="roboto-bold text-[20px] xl:text-[25px]">
            Change Password
          </h1>
        </div>
        <div>
          <form className="flex flex-col gap-3 my-2">
            <div>
              <input
                placeholder="Current Password"
                className="w-full p-2 rounded-[5px] bg-[#DFBABA] input focus:outline-none"
              />
            </div>
            <div>
              <input
                placeholder="New Password"
                className="w-full p-2 rounded-[5px] bg-[#DFBABA] input focus:outline-none"
              />
            </div>
            <div>
              <input
                placeholder="Confirm New Password"
                className="w-full p-2 rounded-[5px] bg-[#DFBABA] input focus:outline-none"
              />
            </div>
            <button
              className="w-full xl:w-[50%] py-1 text-white bg-[#444444] inter-medium text-[22px] rounded-[5px] hover:bg-[#333333] transition-all duration-200"
              type="submit"
              onClick={(e) => e.preventDefault()}
            >
              Update Password
            </button>
          </form>
        </div>
        <div>
          <hr className="border-[1.2px] border-[rgb(0,0,0,0.2)]" />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <h1 className="roboto-bold text-[22px] xl:text-[27px] text-[#E50909] opacity-[70%]">
              Delete Account
            </h1>
            <p className="roboto-regular text-[15px]">
              Once deleted, your account cannot be recovered.
            </p>
          </div>
          <button className="roboto-regular bg-[#E50909] hover:bg-red-500 transition-all duration-200 bg-opacity-[70%] rounded-[5px] text-white text-[20px] w-full xl:w-[50%] py-1 flex justify-center items-center gap-2">
            <FontAwesomeIcon icon={faTrashCan} />
            Delete Account
          </button>
        </div>
      </section>
    </>
  )
}

export default Settings
