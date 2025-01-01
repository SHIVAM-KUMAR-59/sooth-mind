import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

export default async function Home() {
  const session = await getServerSession(authOptions)

  const sanitizedSession = {
    ...session,
    user: {
      ...session?.user,
      id: session?.user.id?.toString() || null,
      image: session?.user.image || null,
    },
  }

  return (
    <>
      <Navbar session={session ? sanitizedSession : null} />
      <Hero session={session ? sanitizedSession : null} />
    </>
  )
}
