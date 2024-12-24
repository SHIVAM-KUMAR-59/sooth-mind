import { getServerSession } from 'next-auth'
import { authOptions } from '../pages/api/auth/[...nextauth]'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Image from 'next/image'

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return <Link href="/auth/signin">Sign In</Link>
  }

  return (
    <>
      <Navbar session={session} />
      <section className="relative min-h-screen bg- flex items-center justify-center">
        {/* Large Circle */}
        <div className="relative w-[70%] sm:w-[50%] aspect-square bg-gradient-to-b from-[#FEEFE7] to-[#D8BBAB] rounded-full flex items-center justify-center shadow-lg">
          {/* Green Circle */}
          <div className="absolute top-[20%] -left-[10%] w-[20%] aspect-square bg-gradient-to-r from-[#81A285] to-[#546F57] rounded-full shadow-md"></div>
          {/* Peach Circle */}
          <div className="absolute top-[7%] right-[3%] w-[17%] aspect-square bg-gradient-to-bl from-[#FFC3A3] to-[#C0947B] rounded-full shadow-md"></div>
          {/* Small Green Circle */}
          <div className="absolute top-[45%] -left-[20%] w-[5%] aspect-square bg-gradient-to-r from-[#81A285] to-[#3F6F45] rounded-full"></div>
          {/* Small Peach Circle */}
          <div className="absolute top-[25%] -right-[10%] w-[5%] aspect-square bg-gradient-to-bl from-[#FFC3A3] to-[#C0947B]  rounded-full"></div>
          {/* Dark Green Central Circle */}
          <div className="absolute w-[35%] top-[5%] aspect-square bg-gradient-to-r from-[#96A698] to-[#3F4E3F] rounded-full flex flex-col items-center justify-center p-2 text-[#FFFBFB] font-[700]">
            <h1 className="w-full px-2 text-center text-[25px] mt-4">
              Start Your Journey to Wellness
            </h1>
            <p className="text-center p-2 text-[13px] font-[600]">
              Explore AI-powered tools for journaling and therapy, designed to
              support your mental well-being
            </p>
          </div>
          {/* Background Wavy Shape */}
          <div className="absolute bottom-[10%] w-full h-[60%] flex justify-center items-center">
            <Image
              src="/Mask-group.png"
              alt="Wavy Shape"
              className="object-contain object-center z-0"
              fill
            />
            <div className="flex flex-col z-10 w-[50%]  p-2 absolute bottom-[5%] gap-10">
              <button className=" bg-gradient-to-r rounded-[50px] from-[#FFF8F2] to-[#D7D7D7] w-[60%] mx-auto  py-3 px-5 text-[#599091] text-[27px] font-[700] uppercase shadow-md">
                Begin Now
              </button>
              <button className="bg-gradient-to-r rounded-[50px] from-[#FFF8F2] to-[#D7D7D7]  py-3 px-5 text-[#599091] text-[27px] font-[700] uppercase shadow-md">
                Gain More Insight
              </button>
            </div>
          </div>

          {/* Cloud Images */}
          <div className="absolute bottom-[25%] left-[7%]">
            <Image
              src="/Cloud.png"
              alt="Cloud 1"
              className="w-[250px] h-[300px] object-contain object-center"
              width={250}
              height={300}
            />
          </div>
          <div className="absolute bottom-[20%] right-[10%]">
            <Image
              src="/Cloud.png"
              alt="Cloud 2"
              className="w-[200px] h-[250px] object-contain object-center"
              width={200}
              height={250}
            />
          </div>
        </div>

        {/* Leaves */}
        <div className="absolute bottom-[1%] left-[12%] aspect-square h-[40%] flex items-center justify-center">
          <Image
            src="/Leafy Plant.png"
            alt="Leaf"
            className="h-full object-center"
            fill
          />
        </div>
        <div className="absolute bottom-[1%] right-[8%] aspect-square h-[40%] flex items-center justify-center">
          <Image
            src="/Leafy Plant.png"
            alt="Leaf"
            className="h-full object-center"
            fill
          />
        </div>
      </section>
    </>
  )
}
