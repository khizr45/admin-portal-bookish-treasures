import React from 'react';
import './ChatList.css'; // Assuming you have a separate CSS file for styling

const ChatList = () => {
  // Sample data for chat list
  const chats = [
    { name: 'John', unreadMessages: 0 },
    { name: 'Jane', unreadMessages: 3 },
    { name: 'Alice', unreadMessages: 1 },
    { name: 'Bob', unreadMessages: 0 },
  ];

  return (
    <div className="chat-list">
      {chats.map((chat, index) => (
        <div key={index} className={chat.unreadMessages > 0 ? 'chat-item unread' : 'chat-item'}>
          <div className="chat-avatar">{chat.name.charAt(0)}</div>
          <div className="chat-info">
            <div className="chat-name">{chat.name}</div>
            {chat.unreadMessages > 0 && <div className="unread-count">{chat.unreadMessages}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
