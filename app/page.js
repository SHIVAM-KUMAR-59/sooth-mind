import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Link from 'next/link'
import Navbar from '@/components/Navbar'

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

      <Navbar session={session} />
    </>
  )
}
