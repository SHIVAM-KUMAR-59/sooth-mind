import { signIn } from 'next-auth/react'
import Image from 'next/image'

const GoogleSignupButton = () => {
  return (
    <button
      type="button"
      className="bg-[#242C2F] w-[95%] xl:w-[70%] mx-auto rounded-[8px] py-2 mt-3 xl:my-3 gap-1 flex items-center justify-center inter-medium text-[20px] hover:bg-[#2E373B] hover:shadow-lg transition-all duration-200"
      onClick={() => signIn('google')}
    >
      <Image src="/GoogleLogo.png" height={38} width={38} alt="Google Logo" />
      <span className="capitalize">Continue With Google</span>
    </button>
  )
}

export default GoogleSignupButton
