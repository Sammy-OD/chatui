import React from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message'

type MessagesProps = {
  name: string,
  messages: {
    user: string,
    text: string,
    time: string
  }[]
}

const Messages = ({name, messages}: MessagesProps): JSX.Element => {
  return (
    <ScrollToBottom className='w-full h-full'>
      {messages.map((message, idx) => (<div key={idx}><Message message={message} name={name}/></div>))}
    </ScrollToBottom>
  )
}

export default Messages
