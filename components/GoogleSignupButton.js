import { signIn } from 'next-auth/react'
import Image from 'next/image'

const GoogleSignupButton = () => {
  return (
    <button
      type="button"
      className="sm:p-3 p-2 flex justify-center gap-3 items-center rounded-[50px] text-xl sm:text-2xl w-full sm:w-[83%] text-black bg-white border-[2px] border-black "
      onClick={() => signIn('google')}
    >
      <Image src="/GoogleLogo.png" height={62} width={75} alt="Google Logo" />
      <span className="ml-2 capitalize">SIGN IN WITH GOOGLE</span>
    </button>
  )
}

export default GoogleSignupButton
