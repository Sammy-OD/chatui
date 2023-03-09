type MessageProps = {
  name: string,
  message: {
    user: string,
    text: string,
    time: string
  }
}

const Message = ({message: {user, text, time}, name}:MessageProps): JSX.Element => {

  return (
    name.trim().toLowerCase() === user.trim().toLowerCase() ? (
      <div className="flex flex-col items-end ml-[48%] md:ml-[55%] mb-3">
        <p className="bg-blue-600 p-4 text-white rounded-md">{text}</p>
        <small className="text-gray-600 mr-2">You {time}</small>
      </div>
    ) : (
      <div className="flex flex-col items-start mr-[48%] md:mr-[55%] mb-3">
        <p className="bg-blue-400 p-3 text-white rounded-md">{text}</p>
        <small className="text-gray-600 ml-2">{user} {time}</small>
      </div>
    )
  )
}

export default Message
