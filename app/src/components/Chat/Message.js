import React from 'react';

const Message = ({chat, user, chatID}) => (
    <div>
        {chatID === chat.chatID ? 
            (<div className={`chat ${user === chat.username ? "right" : "left"}`}>
                <li className="user">{chat.username}</li>
                {chat.content}
            </div>):(<div></div>)}
    </div>
    
);

export default Message;