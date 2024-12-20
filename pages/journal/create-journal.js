import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }

  // Sanitize the session object
  const sanitizedSession = {
    ...session,
    user: {
      ...session.user,
      id: session.user.id?.toString() || null, // Convert ObjectId to string
      image: session.user.image || null, // Replace undefined with null
    },
  }

  return {
    props: { session: sanitizedSession },
  }
}

const CreateJournal = ({ session }) => {
  return (
    <div>
      <h1>Create Journal</h1>
      <p>Welcome, {session.user.name}</p>
      <form></form>
    </div>
  )
}

export default CreateJournal
