import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Input = ({ value, placeholder, icon, type, register, name }) => {
  const [inputValue, setInputValue] = useState(value || '')

  // Synchronize state with the prop value
  useEffect(() => {
    setInputValue(value || '')
  }, [value])

  const handleChange = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <div className="flex items-center justify-center w-full text-[17px] bg-[#DFBABA] p-2 rounded-[8px]">
      {icon && (
        <div className="w-[12%] text-center">
          <FontAwesomeIcon icon={icon} />
        </div>
      )}
      <div className="w-[85%]">
        <input
          {...register(name)} // Register the input field with the given name
          placeholder={placeholder}
          className="w-full bg-[#DFBABA] focus:outline-none py-1 dm-sans-medium"
          value={inputValue}
          type={type}
          onChange={(e) => {
            handleChange(e) // Handle value change locally
          }}
        />
      </div>
    </div>
  )
}

export default Input
