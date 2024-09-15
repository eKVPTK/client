import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io('http://localhost:5000'); 

const AdminChat = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('newMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, `${data.username}: ${data.message}`]);
        });
    }, []);

    const sendMessage = (username, message) => {
        socket.emit('sendMessage', { username: 'Admin', message });
    };

    return (
        <div>
            <h2>Admin Chat</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p>{msg}</p>
                        <button onClick={() => sendMessage('User1', 'Reply from admin')}>Reply</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminChat;
