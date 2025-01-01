'use client'
import '../app/globals.css'
import '@/app/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Hero = ({ session }) => {
  const [route, setRoute] = useState('/auth/signin')

  useEffect(() => {
    if (session) {
      setRoute('/journal/create-journal')
    }
  }, [session])

  return (
    <section className="relative min-h-screen flex items-center justify-center p-3">
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <div className="w-[90%] mx-auto">
          <p className="text-[30px] text-black text-center dm-serif md:text-[50px] lg:text-[65px] xl:text-[80px]">
            Track Your Emotional Journey
          </p>
        </div>
        <div className="w-[80%] md:w-[80%] lg:w-[75%] xl:w-[65%] mx-auto">
          <p className="text-[15px] md:text-[25px] lg:text-[32px] xl:text-[39px] text-black w-full text-center roboto-light">
            Write about your day, and let AI help you understand your emotional
            patterns through beautiful visualisations.
          </p>
        </div>
        <div className="group w-[90%] lg:w-[60%] mx-auto mt-3">
          <Link
            href={{
              pathname: route,
              query: session
                ? { session: JSON.stringify(session.user.id) }
                : {},
            }}
            className="text-center mx-auto px-2 py-3 w-[70%] rounded-[8px] bg-black cursor-pointer hover:bg-[#292929] flex justify-center gap-3 items-center roboto-bold text-[18px] md:text-[25px] lg:text-[30px] xl:text-[35px] sm:mt-4 hover:scale-105 hover:shadow-lg transition-all duration-200"
          >
            Begin Your Journey
            <FontAwesomeIcon
              icon={faArrowRight}
              className="group-hover:translate-x-2 transition-all duration-500"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
