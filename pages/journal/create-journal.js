import '@/app/styles.css'
import '@/app/globals.css'

const CreateJournal = () => {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-[#E6E3C4] to-[#BBD5DA]">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="text-[30px] fraunces-semiBold text-black mt-6">
              Convey Your Feelings
            </h1>
          </div>
          <div className="w-[92%] mx-auto mt-8 ">
            <form className="flex flex-col gap-4">
              <div className="flex items-center justify-between w-full">
                <label className="w-[30%] text-[18px] inter-soft text-black">
                  Title:
                </label>
                <input
                  placeholder="Tuesday, December 31, 2024"
                  className="w-[70%] px-2 py-1 rounded-[8px] bg-[#FFF7F7] text-black text-[15px] focus:outline-none"
                />
              </div>
              <div className="flex justify-between w-full mt-2">
                <label className="w-[30%] text-[18px] inter-soft text-black">
                  Description:
                </label>
                <textarea
                  placeholder="Today feels like a steady day - not particularly great, but not bad either. My energy levels are moderate, and I'm managing to go through my daily routine without much difficulty."
                  className="w-[70%] px-2 py-1 rounded-[8px] bg-[#FFF7F7] text-black text-[15px] focus:outline-none"
                  rows={4}
                />
              </div>
              <div className="flex flex-col w-full gap-2 mt-2">
                <label className="text-[18px] inter-soft text-black">
                  Write Today's Entry:
                </label>
                <textarea
                  placeholder="How are you feeling today?"
                  className="w-[100%] px-2 py-1 rounded-[8px] bg-[#FFF7F7] text-black focus:outline-none text-[15px]"
                  rows={10}
                />
              </div>
              <button
                className="bg-gradient-to-t to-[#0F0E0E] from-[#5C5656] text-white inter-medium rounded-[5px] text-[20px] w-full py-2"
                type="submit"
              >
                Save and Generate Analysis
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  )
}

export default CreateJournal
