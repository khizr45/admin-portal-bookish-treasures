import { useEffect, useState } from 'react';
import styles from './SingleChat.module.css';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client'
import { NavBar } from '../Navbar';
export const SingleChatLogo = () => {
  return (
      <div
        className={styles.chatWindow}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
        </div>
      </div>
  );
};

export const SingleChat = (props) => {
    // let user = useSelector(state=>state.user)
    const [mess,setMess] = useState([
    ])
    const [SenderMessage,setSenderMessage] = useState('')
    const socket = io("https://bookish-treasures-backend.onrender.com")
    socket.on('connect',()=>{
      console.log("single chat")
    })
    socket.emit('userOnline','admin')
    socket.on('newMess',async(newMessage,send,recv)=>{
      
      if(send === props.user){
        setMess(prevItems => [...prevItems,{sender:send,message:newMessage}])
          const response = await fetch("https://bookish-treasures-backend.onrender.com/update/read_flag",{
              method:'POST',
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({send,recv})
          });
      }else{
        props.updateUsers()
      }
    })

    async function updateReadFlag(){
      let send = props.user
      let recv = 'admin'
      const response = await fetch("https://bookish-treasures-backend.onrender.com/update/read_flag",{
              method:'POST',
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({send,recv})
          });
    }
    async function getMessages(){
      let user = props.user
      const response = await fetch("https://bookish-treasures-backend.onrender.com/get/message/history",{
              method:'POST',
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({user})
          });

      const data = await response.json()
      setMess([{sender:data[0].sender, message:data[0].message}])
      for(let i=1;i<data.length;i++){
        setMess(prevItems=>[...prevItems,{sender:data[i].sender,message: data[i].message}])
      }
    }
    useEffect(()=>{
        props.updateUsers()
          getMessages()
          updateReadFlag()
    },[props.user])

    function newSenderMessage(){
      setMess(prevItems => [...prevItems,{sender:'admin',message:SenderMessage}])
      socket.emit('userSendMessage',SenderMessage,'admin',props.user)
      setSenderMessage('')
    }
  return (
    <div>
        {/* <NavBar/> */}
      <div className={styles.chatWindow}>
        <div className={styles.chatDiv}>
          <div className={styles.chatHeader}>
            <div className={styles.chatAvatar}>
              <h4>
                {props.initials}
              </h4>
            </div>
            <div>
              <h4 className={styles.headingg}>{props.user}</h4>
            </div>
          </div>
          <div className={styles.messages}>
            {/* // Messages will be displayed here */}
            {mess.map((message)=>{
                return(
                    <>
                        <div
                        className={message.sender === 'admin'
                            ? styles.userMessage
                            : styles.message
                        }
                        >
                        <div className={styles.messageAvatar}>
                            <h4>{message.sender==='admin' ? 'CS' : props.initials}</h4>
                        </div>
                        <div
                            className={ message.sender === 'admin'
                                ? styles.userMessageContent
                                : styles.messageContent
                            }
                        >
                            <p>{message.message}</p>
                        </div>
                        </div>
                    </>
                );
            })}
          </div>
          <div ></div>
          <div className={styles.newMessage}>
            <input
                value={SenderMessage}
              type="text"
              placeholder="Type a message"
              className={styles.input}
              onChange={(e)=>{setSenderMessage(e.target.value)}}
            />
            <button className={styles.sendButton} onClick={newSenderMessage}>
              <SendIcon sx={{ size: 22 }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};