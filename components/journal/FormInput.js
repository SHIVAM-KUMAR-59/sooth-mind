const FormInput = ({
  label,
  placeholder,
  register,
  errors,
  name,
  type = 'text',
  rows = 1,
  isRowLayout = false, // New prop to switch between row and column layout
}) => (
  <div className={`flex ${isRowLayout ? 'flex-row' : 'flex-col'} w-full mt-2`}>
    <div className={`flex ${isRowLayout ? 'w-[50%]' : ''} justify-between`}>
      <label className="text-[18px] md:text-[28px] inter-soft text-black">
        {label}:
      </label>
      {type === 'textarea' ? (
        <textarea
          placeholder={placeholder}
          className="w-[70%] px-2 py-1 md:py-2 rounded-[8px] bg-[#FFF7F7] text-black text-[15px] md:text-[18px] focus:outline-none"
          rows={rows}
          {...register(name, { required: `${label} cannot be empty` })}
        />
      ) : (
        <input
          placeholder={placeholder}
          className="w-[70%] px-2 py-1 md:py-2 rounded-[8px] bg-[#FFF7F7] text-black text-[15px] md:text-[18px] focus:outline-none"
          type={type}
          {...register(name, { required: `${label} cannot be empty` })}
        />
      )}
    </div>
    {errors[name] && (
      <p className="ml-1 inter-regular text-red-500 mt-2 md:text-[20px]">
        {errors[name]?.message}
      </p>
    )}
  </div>
)

export default FormInput
