import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Image from 'next/image'

const GoogleSignupButton = () => {
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = async () => {
    setLoading(true) // Start loading animation
    try {
      await signIn('google')
    } catch (error) {
      console.error('Sign-in failed:', error)
    } finally {
      setLoading(false) // Stop loading animation once the response comes
    }
  }

  return (
    <button
      type="button"
      className="bg-[#242C2F] w-[95%] xl:w-[70%] mx-auto rounded-[8px] py-2 mt-3 xl:my-3 gap-1 flex items-center justify-center inter-medium text-[20px] hover:bg-[#2E373B] hover:shadow-lg transition-all duration-200"
      onClick={handleGoogleSignIn}
      disabled={loading} // Disable the button while loading
    >
      {loading ? (
        <div className="animate-spin border-4 border-t-4 border-[#ffffff] border-solid w-6 h-6 rounded-full"></div>
      ) : (
        <Image src="/GoogleLogo.png" height={38} width={38} alt="Google Logo" />
      )}
      <span className="capitalize">
        {loading ? 'Signing In...' : 'Continue With Google'}
      </span>
    </button>
  )
}

export default GoogleSignupButton
