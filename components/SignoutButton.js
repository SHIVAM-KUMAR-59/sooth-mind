'use client'

const { signOut } = require('next-auth/react')

const SignoutButton = () => {
  return (
    <button
      className="p-3 bg-blue-500 rounded-lg mx-auto text-2xl w-[80%] text-white"
      onClick={() => {
        signOut()
      }}
    >
      Sign Out!
    </button>
  )
}

export default SignoutButton
