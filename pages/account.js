import React, { useEffect } from 'react'
import '@/app/globals.css'
import '@/app/styles.css'

const account = () => {
  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'))

    const user = session.user
    const { name, id, image, email } = user
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#EBF4F5] to-[#B5C6E0]"></main>
  )
}

export default account
