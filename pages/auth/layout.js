export default function AuthLayout({ children, type }) {
  const isSignup = type === 'signup'
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EBF4F5] to-[#B5C6E0] flex justify-center items-center">
      <div className="w-[85%] sm:w-[70%] mx-auto bg-gradient-to-br from-[#E6E3C4] to-[#BBD5DA] min-h-[600px] rounded-[8px] shadow-md">
        <div className="w-[100%]">
          <h1
            className={`text-center text-[32px] ${
              isSignup && 'text-[28px]'
            } xl:text-[60px] mt-2 text-black`}
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 600 }}
          >
            {isSignup ? 'Create New Account' : 'Welcome Back'}
          </h1>
          <p
            className={`text-center text-[22px] ${
              isSignup && 'text-[20px]'
            } xl:text-[32px] text-black mt-2`}
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: '300' }}
          >
            {isSignup ? 'Rest, Recharge, Repeat' : 'Pause, Reflect, Heal'}
          </p>
        </div>
        <div className="sm:flex"> {children}</div>
      </div>
    </div>
  )
}
