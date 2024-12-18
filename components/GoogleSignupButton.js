import { signIn } from 'next-auth/react'

const GoogleSignupButton = () => {
  return (
    <button
      type="button"
      className="p-3 bg-blue-500 rounded-lg mx-auto text-2xl w-[80%] text-white"
      onClick={() => signIn('google')}
    >
      Sign up with Google
    </button>
  )
}

export default GoogleSignupButton
