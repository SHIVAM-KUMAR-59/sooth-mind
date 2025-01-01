import Link from 'next/link'
import React from 'react'

const HelpText = ({ position, margin, text, link }) => {
  return (
    <div
      className={`w-[90%] xl:w-[70%] mx-auto text-${position} ${margin}  poppins-light text-[16px] text-black `}
    >
      <Link href={link} className={`underline poppins-extralight`}>
        {text}
      </Link>
    </div>
  )
}

export default HelpText
