import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

function ChatBox() {
  const [recvMessage,setRecvMess] = useState('')
  function messagePass(){
    socket.emit('userSendMessage','hello','admin','m.khizar133')
  }
  const socket = io("https://bookish-treasures-backend.onrender.com")
    socket.on('newMess',(newMessage,send,recv)=>{
        setRecvMess(newMessage)
    })
    useEffect(()=>{
            socket.emit('userOnline','admin')
    },[])
  return (
    <div>
      <h1>CHAT BOX ADMIn</h1>
      <button onClick={messagePass}>message</button>
      <p>{recvMessage}</p>
    </div>
  )
}

export default ChatBox
