export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EBF4F5] to-[#B5C6E0] flex justify-center items-center">
      <div className="w-[85%] mx-auto bg-gradient-to-br from-[#E6E3C4] to-[#BBD5DA] min-h-[600px] rounded-[8px] shadow-md">
        {children}
      </div>
    </div>
  )
}
