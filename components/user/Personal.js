import React from 'react'
import Form from './Form'
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Personal = ({ user }) => {
  return (
    <>
      <div className="w-full xl:w-[95%] text-left">
        <p className="text-[22px] xl:text-[30px] roboto-bold">
          Personal Details
        </p>
        <p className="text-[15px] xl:text-[22px] roboto-semibold text-[#7C7C7C]">
          Your profile information
        </p>
      </div>
      <div className="rounded-[50%] w-[76px] xl:w-[150px] h-[76px] xl:h-[150px] bg-[#d4bdbd] flex justify-center items-center">
        <FontAwesomeIcon
          icon={faUserLarge}
          className="text-[40px] xl:text-[90px]"
        />
      </div>
      <Form user={user} />
    </>
  )
}

export default Personal
