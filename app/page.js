import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Link from 'next/link'
import SignoutButton from '@/components/SignoutButton'

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session)

  if (!session) {
    return <Link href="/auth/signin">Sign In</Link>
  }

  return (
    <div>
      <h1 className="text-3xl">Hello, {session.user.name}</h1>
      <SignoutButton />
    </div>
  )
}
