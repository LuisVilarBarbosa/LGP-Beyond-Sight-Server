import React from 'react';

const Message = ({chat, user}) => (
    <div className={`chat ${user === chat.username ? "right" : "left"}`}>
        <li className="user">{user}</li>
        {chat.content}
    </div>
);

export default Message;