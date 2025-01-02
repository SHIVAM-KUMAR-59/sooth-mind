import React, { useEffect, useState } from 'react'
import '@/app/globals.css'
import '@/app/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Menu from '@/components/user/Menu'

import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import Personal from '@/components/user/Personal'
import { signOut } from 'next-auth/react'
import Journals from '@/components/user/Journals'

const account = () => {
  const [user, setUser] = useState({})
  const [selected, setSelected] = useState('Account')

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'))

    const user = session.user

    const { name, id, image, email } = user
    setUser({ name, id, image, email })
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EBF4F5] to-[#B5C6E0] flex flex-col justify-center items-center text-black gap-3">
      <div className="w-[90%] bg-[#FFEEEE] shadow-xl mx-auto p-4 rounded-[8px] flex justify-between items-center gap-5">
        <p className="text-[22px] dm-sans-semi-bold w-fit xl:text-[64px] xl:text-[#515151]">
          Welcome, {user.name}
        </p>
        <button
          className="flex items-center justify-center xl:p-3 xl:bg-white hover:shadow-md xl:rounded-[10px] transition-all duration-200 hover:-translate-y-1 xl:gap-2"
          onClick={() => signOut()}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="text-[22px]" />
          <p className="hidden xl:contents text-[25px] inter-medium">
            Sign out
          </p>
        </button>
      </div>
      <div className="w-[90%] mx-auto">
        <div className="w-full xl:w-[40%] xl:mx-0 xl:self-start xl:mt-7 bg-[#FFEEEE] shadow-xl mx-auto py-3 px-2 rounded-[8px] flex justify-between items-center">
          <Menu selected={selected} setSelected={setSelected} />
        </div>
      </div>

      <div className="w-[90%] mx-auto bg-[#FFEEEE] p-3 rounded-[8px] flex flex-col justify-center items-center gap-3">
        {selected === 'Account' && <Personal user={user} />}
        {selected === 'My Journals' && <Journals user={user} />}
      </div>
    </main>
  )
}

export default account
