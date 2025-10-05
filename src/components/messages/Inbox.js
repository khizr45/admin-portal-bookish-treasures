import styles from './Inbox.module.css';
import { Outlet, useNavigate} from 'react-router-dom';
import { SingleChat } from './singleChat';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import Navbar from '../Navbar';

export const Inbox = () => {

    const [chatOpen,setChatOpen] = useState(0)
    const [users,setUsers] = useState([
    ])

    const [username,setUsername] = useState('')
    const [initials,setInitials] = useState('')

  const navigate = useNavigate()
  function navigateToChat(user,init){
    setChatOpen(1)
    setUsername(user)
    setInitials(init)
  }
  // const socket = io("https://bookish-treasures-backend.onrender.com/")
  // socket.on('ResetUsers',async(newMessage,send,recv)=>{
  //   console.log('inbox pr aagaya')
  //   setUsers([])
  //   getUsers()
  // })
  async function getUsers(){
    setUsers([])
    const response = await fetch('https://bookish-treasures-backend.onrender.com/all/senders')
    const data = await response.json()
    const response2 = await fetch('https://bookish-treasures-backend.onrender.com/get/unread/messages')
    const data2 = await response2.json()
    for(let i=0;i<data.length;i++){
      let initials = data[i].sender[0].toUpperCase().concat(data[i].sender[data[i].sender.length-1].toUpperCase())
      if(data[i].sender != 'admin'){
        let unread_messages = 0
        for(let j=0;j<data2.length;j++){
          if(data[i].sender === data2[j].sender){
            unread_messages = data2[j].unread_messages
            break;
          }
        }
        let newEntry = {userName: data[i].sender,initials:initials, unread: unread_messages}
        setUsers(prevItems=>[...prevItems,newEntry])
      }
    }
  }
  useEffect(()=>{
    // socket.emit('userOnline','admin')
    setUsers([])
    getUsers()
  },[])
  return (
    <div>
      <Navbar/>
    <div className={`Main ${styles.main}`}>
        <div className={styles.window}>
          <div className={styles.backArr}>
          </div>
          <div className={styles.navli}>
            <div className={styles.chatHead}>Chats</div>
            <ul className={styles.chatList}>
                <li>
                  {/* <Link to={`/user/inbox/${company.user_id}` }> */}
                    {users.map((items,index)=>{
                        return(
                            <div className={styles.chat} onClick={()=>{navigateToChat(items.userName,items.initials)}} key={index}>
                                <div className={styles.chatAvatar}>
                                    <h4>
                                    {items.initials}
                                    </h4>
                                </div>
                                <div className={styles.chatDetails}>
                                    <div className={styles.unreadDiv}>
                                    <h4>{items.userName}</h4>
                                    <h4 id={styles.number}>
                                        {items.unread === 0 ? '' : items.unread}
                                    </h4>
                                    </div>
                                    {/* <p>
                                    Hi, thanks for contacting us, we will reach out
                                    shortly
                                    </p> */}
                                </div>
                            </div>
                        )
                    })}
                  {/* </Link> */}
                </li>

            </ul>
          </div>
          {chatOpen === 1 ? <SingleChat user = {username} initials = {initials} updateUsers = {getUsers}/>:''}
          <Outlet />
        </div>
    </div>
    </div>
  );
};