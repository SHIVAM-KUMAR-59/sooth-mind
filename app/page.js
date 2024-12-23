import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Link from 'next/link'
import SignoutButton from '@/components/SignoutButton'
import Image from 'next/image'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <Link href="/auth/signin">Sign In</Link>
  }

  return (
    <>
      {/* <h1 className="text-3xl">Hello, {session.user.name}</h1>
      <SignoutButton />
      <Link href="/journal/create-journal">Create Journal</Link> */}

      <nav className="flex w-full ">
        <div className="flex w-[90%] mx-auto items-center justify-between p-2 uppercase">
          <div>
            <Image src="/Logo.png" height={57} width={150} alt="Logo" />
          </div>
          <div className="flex items-center justify-between gap-3 w-[45%]  ">
            <div className="flex w-[60%] justify-between ">
              <ul className="flex justify-evenly w-full text-[16px] text-[#5B7285] font-[700] ">
                <li>About</li>
                <li>Features</li>
                <li>Contact Us</li>
                <li>Help</li>
              </ul>
            </div>
            <div className="flex w-[60%] justify-center gap-3">
              {session ? (
                <>
                  <button className="px-5 py-2 rounded-[30px] bg-gradient-to-r from-[#87B1D3] to-[#467DA8]">
                    Login
                  </button>
                  <button className="px-5 py-2 rounded-[30px] bg-[#3f8ca8]">
                    Get Started
                  </button>
                </>
              ) : (
                <button>Sign In</button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
