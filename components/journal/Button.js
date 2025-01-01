const Button = ({ isPending, children }) => (
  <button className="bg-gradient-to-t to-[#0F0E0E] from-[#5C5656] text-white inter-medium rounded-[5px] text-[20px] md:text-[25px] w-full md:w-[55%] xl:w-[40%] self-end py-2">
    {isPending ? 'Saving...' : children}
  </button>
)

export default Button
