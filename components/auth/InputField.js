import React from 'react'

const InputField = ({
  register,
  errors,
  name,
  label,
  type,
  placeholder,
  validationRules,
}) => {
  return (
    <div className="flex flex-col w-[95%] xl:w-[70%] mx-auto mt-2">
      <label className="ml-1 inter-regular">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="p-2 rounded-[8px] border"
        {...register(name, validationRules)}
      />
      {errors[name] && (
        <p className="ml-1 inter-regular text-red-500 mt-2">
          {errors[name].message}
        </p>
      )}
    </div>
  )
}

export default InputField
