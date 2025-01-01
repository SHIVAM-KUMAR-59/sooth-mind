import Link from 'next/link'
import React from 'react'

const NavButton = ({ href, background, hover, text, color }) => {
  return (
    <Link
      href={href}
      className={`py-2 w-[50%] text-${color} rounded-[10px] ${background} cursor-pointer ${hover} transition-all duration-500 flex justify-center items-center roboto-medium md:text-[20px] lg:text-[25px]`}
    >
      {text}
    </Link>
  )
}

export default NavButton
