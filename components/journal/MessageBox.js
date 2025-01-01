const MessageBox = ({ message, isError, setIsError, setMessage, id }) => (
  <div className="w-[65%] xl:w-[30%] bg-black bg-opacity-80 absolute text-center p-4 inter-medium flex flex-col items-center justify-center gap-4 rounded-lg text-[20px] md:text-[30px]">
    <div>{message}</div>
    <div className="w-[90%] flex flex-col items-center justify-center">
      {isError ? (
        <button
          className="text-white bg-slate-400 py-2 block w-full rounded-[8px] text-[20px] md:text-[25px] cursor-pointer"
          onClick={() => {
            setIsError(false)
            setMessage(null)
          }}
        >
          Retry
        </button>
      ) : (
        <Link
          href={id ? `/journal/${id}` : '/'}
          className="text-white bg-slate-400 py-2 block w-full rounded-[8px] text-[20px] md:text-[25px] cursor-pointer"
        >
          View Journal
        </Link>
      )}
    </div>
  </div>
)

export default MessageBox
