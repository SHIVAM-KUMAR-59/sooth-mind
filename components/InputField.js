const InputField = ({
  label,
  type,
  placeholder,
  register,
  validation,
  error,
}) => {
  return (
    <div className="flex flex-col gap-2 mx-auto justify-center align-center w-[80%]">
      <input
        type={type}
        placeholder={placeholder}
        className="p-3 rounded-md"
        {...register(label, validation)}
      />
      {error && <span className="text-red-500 text-md">{error.message}</span>}
    </div>
  )
}

export default InputField
