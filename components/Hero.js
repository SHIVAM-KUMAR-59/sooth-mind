'use client'

import '../app/globals.css'
import '@/app/styles.css'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Hero = ({ session }) => {
  const [route, setRoute] = useState('/auth/signin')
  useEffect(() => {
    if (session) {
      setRoute('/journal/create-journal')
    }
  })
  return (
    <section className="relative min-h-screen flex items-center justify-center p-3">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] mx-auto">
          <p className="text-[35px] text-black w-full text-center dm-serif ">
            Track Your Emotional Journey
          </p>
        </div>
        <div className="w-[70%] mx-auto">
          <p className="text-[18px] text-black w-full text-center roboto-light">
            Write about your day, and let AI help you understand your emotional
            patterns through beautiful visualisations.
          </p>
        </div>
        <div className="w-[90%] mx-auto mt-3">
          <Link
            href={route}
            className="text-center mx-auto py-3 w-[60%] rounded-[8px] bg-black cursor-pointer hover:bg-[#0f0f0f] flex justify-center items-center roboto-bold text-[20px]"
          >
            Begin Your Journey --{'>'}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
