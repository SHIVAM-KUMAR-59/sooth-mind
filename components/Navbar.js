'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import SignoutButton from './SignoutButton'

const Navbar = ({ session }) => {
  return (
    <nav className="flex w-full p-2">
      {session ? (
        <>
          <SignoutButton />
        </>
      ) : (
        <div className="w-[95%] mx-auto flex gap-4 items-center justify-between">
          <div className="text-black">Logo</div>
          <div className="flex gap-4 w-[60%]">
            <Link
              href="/auth/signup"
              className="w-[50%] bg-[#C3D8F9] rounded-[10px] text-black cursor-pointer hover:bg-[#a6c1eb] transition-all duration-200 flex justify-center items-center"
            >
              Get Started
            </Link>
            <Link
              href={'/auth/signin'}
              className="py-2 w-[50%] rounded-[10px] bg-gradient-to-t to-[#060606] from-[#666666] cursor-pointer hover:bg-[#0f0f0f] flex justify-center items-center"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
