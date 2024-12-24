'use client'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = ({ session }) => {
  return (
    <nav className="flex w-full ">
      <div className="flex w-[90%] mx-auto items-center justify-between p-2 uppercase">
        <div>
          <Image src="/Logo.png" height={57} width={150} alt="Logo" />
        </div>
        <div className="flex items-center justify-between gap-5 w-[45%]  ">
          <div className="flex w-[60%] justify-between">
            <ul className="flex justify-evenly w-full gap-4 text-[16px] text-[#5B7285] font-[700] whitespace-nowrap">
              <li className="hover:cursor-pointer">About</li>
              <li className="hover:cursor-pointer">Features</li>
              <li className="hover:cursor-pointer">Contact Us</li>
              <li className="hover:cursor-pointer">Help</li>
            </ul>
          </div>
          <div className="flex w-[60%] justify-center gap-3">
            {session ? (
              <button
                onClick={signOut}
                className="w-[50%] py-2 rounded-[30px] bg-gradient-to-r from-[#87B1D3] to-[#467DA8]"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex w-[80%] gap-3">
                <button className="w-full py-2 rounded-[30px] bg-gradient-to-r from-[#87B1D3] to-[#467DA8]">
                  <Link href="/auth/signin">Login</Link>
                </button>
                <button className="w-full py-2 rounded-[30px] bg-[#3f8ca8]">
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
