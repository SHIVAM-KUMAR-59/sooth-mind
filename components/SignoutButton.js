'use client'

import { signOut } from 'next-auth/react'

const SignoutButton = () => {
  return (
    <button
      className="py-2 w-[40%] rounded-[10px] bg-gradient-to-t to-[#060606] from-[#666666] text-white"
      onClick={() => {
        signOut()
      }}
    >
      Sign Out!
    </button>
  )
}

export default SignoutButton
