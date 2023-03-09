import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import Messages from '../../components/Messages'
import { useApp } from '../../context/AppContext'

const Chat: React.FC = () => {
  const client = useRef<any>(null);
  const {data}: any = useApp();
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<{user: string, text: string, time: string}[]>([])

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.room === undefined) return navigate('/')

    client.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${data.room}/`, 'echo-protocol');

    client.current.onopen = () => console.log('WebSocket connected')
    client.current.onclose = () => console.log('WebSocket disconnected')
    client.current.onerror = (err: string) => console.log('WebSocket error', err)
    client.current.onmessage = (message: {data: {}}) => {
      const res = JSON.parse(message.data as string)
      setMessages(prev => ([...prev, {user: res.user, text: res.message, time: res.time}]));
    }

    return () => {
      if (client.current) {
        client.current.close()
      }
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value)
  }

  const sendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (message === '') return

    if(client.current.readyState === 3) {
      return
    }
    
    if (client.current.readyState === client.current.OPEN) {
      client.current.send(JSON.stringify({
        "type": "chat_message",
        "message": message,
        "user": data.name,
        "time": new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true})
      }))

      setMessage('')
    }
  }

  return (
    <div className="flex flex-col container mx-auto bg-white h-[90vh] w-full md:w-[70vw] overflow-hidden">
      <header className="p-3 bg-white shadow z-10">
        <NavLink to='/' className='text-3xl mr-4'>&larr;</NavLink>
        <h1 className="text-2xl capitalize inline-block">{data.room} Room</h1>
      </header>
      <main className="flex-1 p-3 overflow-auto bg-gray-100">
        <Messages messages={messages} name={data.name} />
      </main>
      <footer className="p-2">
        <form className="flex items-end" onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={handleChange}
            className="flex-1 rounded-lg p-2 border border-gray-400"
          />
          <button className="p-2 px-4 bg-green-800 text-white rounded-lg ml-2">Send</button>
        </form>
      </footer>
    </div>
  )
}

export default Chat