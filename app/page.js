import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Hero from '@/components/Hero'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <Link href="/auth/signin">Sign In</Link>
  }

  return (
    <>
      <Navbar session={session} />
      <Hero />
    </>
  )
}
