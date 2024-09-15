import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io('http://localhost:5000');

const UserChat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('newMessage', (data) => {
            setMessages((prevMessages) => [...prevMessages, `${data.username}: ${data.message}`]);
        });
    }, []);

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit('sendMessage', { username: 'User1', message });
            setMessage('');
        }
    };

    return (
        <div>
            <h2>User Chat</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                <h3>Messages:</h3>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
        </div>
    );
}

export default UserChat;
