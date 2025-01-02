import React from 'react'
import Form from './Form'
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Personal = ({ user }) => {
  return (
    <>
      <div className="w-full text-left">
        <p className="text-[22px] roboto-bold">Personal Details</p>
        <p className="text-[15px] roboto-semibold text-[#7C7C7C]">
          Your profile information
        </p>
      </div>
      <div className="rounded-[50%] w-[76px] h-[76px] bg-[#d4bdbd] flex justify-center items-center">
        <FontAwesomeIcon icon={faUserLarge} className="text-[40px]" />
      </div>
      <Form user={user} />
    </>
  )
}

export default Personal
