export default function AuthLayout({ children, type }) {
  const isSignup = type === 'signup'
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EBF4F5] to-[#B5C6E0] flex justify-center items-center">
      <div className="w-[85%] sm:w-[70%] mx-auto bg-gradient-to-br from-[#E6E3C4] to-[#BBD5DA] min-h-[600px] rounded-[8px] shadow-md">
        <div>
          <h1 className="text-center text-[32px] xl:text-[60px] fraunces-semiBold mt-2 text-black">
            {isSignup ? 'Create Your Account' : 'Welcome Back'}
          </h1>
          <p className="text-center text-[22px] xl:text-[32px] text-black dm-sans-light mt-2">
            {isSignup ? 'Rest, Recharge, Repeat' : 'Pause, Reflect, Heal'}
          </p>
        </div>
        <div className="sm:flex"> {children}</div>
      </div>
    </div>
  )
}
