import Link from 'next/link'
import React from 'react'

const Card = ({ journal }) => {
  return (
    <div className="w-full px-3 py-2 bg-[#DFBABA] rounded-[8px] mb-4">
      <Link
        href={`/journal/${journal._id}`}
        className="text-[20px] line-clamp-1 fraunces-semiBold hover:underline"
      >
        {journal.title}
      </Link>
      <p className="inter-soft mt-2 text-[13px] line-clamp-3">
        {journal.description}
      </p>
    </div>
  )
}

export default Card
