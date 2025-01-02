import React from 'react'

const Menu = ({ selected, setSelected }) => {
  return (
    <ul className="w-full flex items-center justify-around text-[18px] dm-sans-bold">
      {['Account', 'My Journals', 'Settings'].map((item) => (
        <li
          key={item}
          className={`rounded-[8px] py-2 px-2 cursor-pointer transition-all duration-300 ease-in-out ${
            selected === item ? 'bg-white shadow-lg' : 'text-[rgba(0,0,0,0.6)]'
          }`}
          onClick={() => setSelected(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default Menu
