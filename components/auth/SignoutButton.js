'use client'

import { signOut } from 'next-auth/react'

const SignoutButton = () => {
  return (
    <button
      className="py-2 w-[40%] xl:w-[10%] xl:py-3 rounded-[10px] bg-gradient-to-t to-[#060606] from-[#666666] text-white inter-medium"
      onClick={() => {
        signOut()
      }}
    >
      Sign Out!
    </button>
  )
}

export default SignoutButton
