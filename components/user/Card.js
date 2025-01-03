import Link from 'next/link'
import React from 'react'

const Card = ({ journal }) => {
  return (
    <Link
      href={`/journal/${journal._id}`}
      className="w-full h-full flex flex-col px-3 py-2 bg-[#DFBABA] rounded-[8px] mb-4 hover:scale-105 hover:shadow-lg hover:bg-[#FDCECE] transition-all duration-200"
    >
      <div className="flex-grow flex flex-col justify-between">
        <Link
          href={`/journal/${journal._id}`}
          className="text-[20px] xl:text-[35px] line-clamp-1 fraunces-semiBold"
        >
          {journal.title}
        </Link>

        <p className="inter-soft mt-2 text-[13px] xl:text-[18px] line-clamp-3">
          {journal.description}
        </p>

        <Link
          href={`/journal/${journal._id}`}
          className="mt-auto inter-soft text-[13px] xl:text-[18px] self-baseline px-3 py-1 rounded-md bg-[#3a3939] text-white"
        >
          Read more
        </Link>
      </div>
    </Link>
  )
}

export default Card
