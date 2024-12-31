import { signIn } from 'next-auth/react'
import Image from 'next/image'

const GoogleSignupButton = () => {
  return (
    <button
      type="button"
      className="bg-[#242C2F] w-[95%] mx-auto rounded-[8px] py-2 mt-3 gap-1 flex items-center justify-center inter-medium text-[20px]"
      onClick={() => signIn('google')}
    >
      <Image src="/GoogleLogo.png" height={38} width={38} alt="Google Logo" />
      <span className="capitalize">Continue With Google</span>
    </button>
  )
}

export default GoogleSignupButton
