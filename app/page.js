import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'

export default async function Home() {
  // Fetch the session on the server side
  const session = await getServerSession(authOptions)

  if (!session) {
    return <h1>You are not logged in</h1>
  }

  return (
    <div>
      <h1 className="text-3xl">Hello, {session.user.name}</h1>
    </div>
  )
}
