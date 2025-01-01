'use client'

import SignoutButton from '../auth/SignoutButton'
import NavButton from './NavButton'

const Navbar = ({ session }) => {
  return (
    <nav className="flex w-full p-2">
      <div className="w-[95%] mx-auto flex gap-4 items-center justify-between">
        <div className="text-black">Logo</div>
        {session ? (
          <>
            <SignoutButton />
          </>
        ) : (
          <div className="flex gap-4 w-[60%] md:w-[50%] xl:w-[30%]">
            <NavButton
              href="/auth/signup"
              background="bg-[#C3D8F9]"
              hover="hover:bg-[#a6c1eb] hover:shadow-md"
              text="Get Started"
              color="black"
            />
            <NavButton
              href="/auth/signin"
              background="bg-[#3a3939]"
              hover="hover:bg-gradient-to-t hover:to-[#323131] hover:from-[#171616] hover:shadow-xl"
              text="Login"
              color="white"
            />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
