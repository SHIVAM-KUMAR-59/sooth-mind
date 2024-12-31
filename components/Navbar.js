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
          <div className="flex gap-4 w-[60%] md:w-[50%] xl:w-[30%]">
            <Link
              href="/auth/signup"
              className="w-[60%]  bg-[#C3D8F9] rounded-[10px] text-black cursor-pointer hover:bg-[#a6c1eb] hover:shadow-md transition-all duration-200 flex justify-center items-center roboto-medium md:text-[20px] lg:text-[25px]"
            >
              Get Started
            </Link>
            <Link
              href={'/auth/signin'}
              className="py-2 w-[50%] rounded-[10px] bg-[#3a3939]  cursor-pointer hover:bg-gradient-to-t hover:to-[#323131] hover:from-[#171616] hover:shadow-xl transition-all duration-200 flex justify-center items-center roboto-medium md:text-[20px] lg:text-[25px]"
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
