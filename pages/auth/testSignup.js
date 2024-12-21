import TestLayout from './testLayout'
import '../../app/globals.css'
import Image from 'next/image'

const TestSignup = () => {
  return (
    <TestLayout>
      <main className=" w-[85%] sm:w-[70%]">
        <div className="flex justify-center items-center gap-2 bg-gradient-to-b from-[#D3E7E7] to-[#A7D8DE] rounded-3xl p-5 shadow-2xl">
          <div className="flex flex-col gap-3 py-3 w-full lg:w-[50%]">
            <div>
              <h1 className="text-[#4B8652] text-3xl text-center lg:text-[50px]">
                WELCOME BACK!
              </h1>
            </div>
            <div>
              <p className="text-[#8661A8] text-lg sm:text-2xl text-center sm:mt-3">
                Rekindle, Reflect, Rejuvenate
              </p>
            </div>
            <form className="flex flex-col gap-3 justify-center items-center mt-2 w-[80%] mx-auto">
              <input
                type="text"
                placeholder="Enter your name"
                className="p-2 sm:p-4 rounded-2xl w-full border-[#647D91] border-[1.5px] sm:border-[2px] sm:w-[80%] sm:rounded-[50px] sm:text-[20px]"
              />
              <input
                type="text"
                placeholder="Enter your name"
                className="p-2 sm:p-4 rounded-2xl w-full border-[#647D91] border-[1.5px] sm:border-[2px] sm:w-[80%] sm:rounded-[50px] sm:text-[20px]"
              />
              <input
                type="text"
                placeholder="Enter your name"
                className="p-2 sm:p-4 rounded-2xl w-full border-[#647D91] border-[1.5px] sm:border-[2px] sm:w-[80%] sm:rounded-[50px] sm:text-[20px]"
              />
              <input
                type="text"
                placeholder="Enter your name"
                className="p-2 sm:p-4 rounded-2xl w-full border-[#647D91] border-[1.5px] sm:border-[2px] sm:w-[80%] sm:rounded-[50px] sm:text-[20px]"
              />

              <button className="bg-[#4B8652] text-white p-2 sm:p-4 rounded-2xl w-full border-white border-[1.5px] sm:text-xl sm:border-[2px] sm:w-[80%] sm:rounded-[50px] sm:text-[20px]">
                Sign Up
              </button>
            </form>

            <div className="relative my-3 flex justify-center items-center">
              <span className="absolute bg-slate-500 rounded-full p-2 text-[12px]">
                OR
              </span>
              <hr className="w-full h-[3px] bg-[#647D91] sm:w-[90%] sm:mx-auto" />
            </div>
            <div className="w-[80%] mx-auto">
              <button className="bg-white p-2 sm:p-4 sm:text-xl rounded-2xl w-full text-black opacity-80 border-[#647D91] border-[1.5px] sm:border-[2px] flex justify-center items-center gap-1 sm:w-[80%] sm:rounded-[50px] sm:text-[20px] sm:mx-auto">
                <div className="relative w-[30px] h-[30px] sm:w-[60px] sm:h-[35px]">
                  <Image
                    src="/GoogleLogo.png"
                    alt="Google"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>Sign Up With Google</span>
              </button>
            </div>
          </div>
          <div className="border-2 border-black hidden lg:contents h-full w-[50%]">
            <Image src="/Login.png" alt="Login" width={500} height={500} />
          </div>
        </div>
      </main>
    </TestLayout>
  )
}

export default TestSignup
