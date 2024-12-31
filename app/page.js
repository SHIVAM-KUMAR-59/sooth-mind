import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      <Navbar session={session} />
      <Hero session={session} />
    </>
  )
}
