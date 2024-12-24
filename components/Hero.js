'use client'

import Image from 'next/image'
import '../app/globals.css'

const Hero = () => {
  return (
    <section className="relative sm:min-h-screen flex items-center justify-center border-2 border-black p-3">
      {/* Large Circle with animation */}
      <div className="relative w-[70%] mx-auto mt-0 sm:w-[50%] aspect-square bg-gradient-to-b from-[#FEEFE7] to-[#D8BBAB] rounded-full flex items-center justify-center shadow-lg ">
        {/* Green Circle */}
        <div className="absolute top-[20%] -left-[10%] w-[20%] aspect-square bg-gradient-to-r from-[#81A285] to-[#546F57] rounded-full shadow-md"></div>
        {/* Peach Circle */}
        <div className="absolute top-[7%] right-[3%] w-[17%] aspect-square bg-gradient-to-bl from-[#FFC3A3] to-[#C0947B] rounded-full shadow-md "></div>
        {/* Small Green Circle */}
        <div className="absolute top-[45%] -left-[20%] w-[5%] aspect-square bg-gradient-to-r from-[#81A285] to-[#3F6F45] rounded-full "></div>
        {/* Small Peach Circle */}
        <div className="absolute top-[25%] -right-[10%] w-[5%] aspect-square bg-gradient-to-bl from-[#FFC3A3] to-[#C0947B] rounded-full "></div>
        {/* Dark Green Central Circle */}
        <div className="absolute sm:w-[35%] w-[60%] top-[2%] sm:top-[5%] aspect-square bg-gradient-to-r from-[#96A698] to-[#3F4E3F] rounded-full flex flex-col items-center justify-center p-2 text-[#FFFBFB] font-[700]">
          <h1 className="w-full px-2 text-center text-[12px] sm:text-[25px] mt-4">
            Start Your Journey to Wellness
          </h1>
          <p className="text-center p-4 text-[8px] sm:text-[13px] font-[600]">
            Explore AI-powered tools for journaling and therapy, designed to
            support your mental well-being
          </p>
        </div>
        {/* Background Wavy Shape */}
        <div className="absolute bottom-[4%] sm:bottom-[10%] w-full h-[60%] flex justify-center items-center">
          <Image
            src="/Mask-group.png"
            alt="Wavy Shape"
            className="object-contain object-center z-0 animate-slideUp"
            fill
          />
          <div className="flex flex-col z-10 sm:w-[50%] p-2 absolute bottom-[1%] sm:bottom-[5%] gap-2 sm:gap-10">
            <button className="bg-gradient-to-r rounded-[50px] from-[#FFF8F2] to-[#D7D7D7] sm:w-[60%] mx-auto py-2 px-3 sm:py-3 sm:px-5 text-[#599091] text-[13px] sm:text-[27px] font-[700] uppercase shadow-md animate-fadeIn">
              Begin Now
            </button>
            <button className="bg-gradient-to-r rounded-[50px] from-[#FFF8F2] mx-auto w-fit to-[#D7D7D7] py-2 px-3 sm:py-3 sm:px-5 text-[#599091] text-[13px] sm:text-[27px] font-[700] uppercase shadow-md animate-fadeIn">
              Gain More Insight
            </button>
          </div>
        </div>

        {/* Cloud Images with cloud animation class */}
        <div className="absolute bottom-[15%] sm:bottom-[25%] left-[7%] cloud">
          <Image
            src="/Cloud.png"
            alt="Cloud 1"
            className="sm:w-[250px] sm:h-[300px] object-contain object-center w-[90px] h-[90px]"
            width={250}
            height={300}
          />
        </div>
        <div className="absolute bottom-[10%] sm:bottom-[20%] right-[10%] cloud-reverse">
          <Image
            src="/Cloud.png"
            alt="Cloud 2"
            className="sm:w-[200px] sm:h-[250px] object-contain object-center w-[70px] h-[70px]"
            width={200}
            height={250}
          />
        </div>
        {/* Leaves */}
        <div className="absolute bottom-[1%] -left-[22%] aspect-square h-[40%] flex items-center justify-center leaf sm:hidden">
          <Image
            src="/Leafy Plant.png"
            alt="Leaf"
            className="h-full object-center"
            fill
          />
        </div>
        <div className="absolute bottom-[1%] -right-[28%] aspect-square h-[40%] flex items-center justify-center sm:hidden">
          <Image
            src="/Leafy Plant.png"
            alt="Leaf"
            className="h-full object-center leaf"
            fill
          />
        </div>
      </div>

      {/* Leaves */}
      <div className="hidden sm:absolute bottom-[1%] left-[12%] aspect-square h-[40%] sm:flex items-center justify-center leaf">
        <Image
          src="/Leafy Plant.png"
          alt="Leaf"
          className="h-full object-center"
          fill
        />
      </div>
      <div className="hidden sm:absolute bottom-[1%] right-[8%] aspect-square h-[40%] sm:flex items-center justify-center leaf">
        <Image
          src="/Leafy Plant.png"
          alt="Leaf"
          className="h-full object-center leaf"
          fill
        />
      </div>
    </section>
  )
}

export default Hero
