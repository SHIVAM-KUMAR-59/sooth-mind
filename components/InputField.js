const InputField = ({
  label,
  type,
  placeholder,
  register,
  validation,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2 justify-center align-center w-full sm:w-[83%] text-[#000000]">
      <input
        type={type}
        placeholder={placeholder}
        className="p-5 sm:p-7 rounded-[50px] text-[20px] sm:text-[26px] border-[3px] border-[#647D91] bg-white placeholder:text-[#000000] placeholder:opacity-[50%] focus:outline-none"
        {...register(label, validation)}
      />
      {error && (
        <span className="text-red-500 text-lg p-1">{error.message}</span>
      )}
    </div>
  )
}

export default InputField
