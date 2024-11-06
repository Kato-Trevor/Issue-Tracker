'use client'

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: 'You are a helpful assistant.',
    },
  ]);

  const sendMessage = async () => {
    const newMessage = {
      role: 'user',
      content: input,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const response = await axios.post('/api/chat-GPT', {
     messages: [...messages, newMessage],
    });

    const assistantMessage = {
      role: 'assistant',
      content: response.data.message,
    };
    setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    setInput('');
  };

  return (
    <div>
      <h1>Chat with ChatGPT</h1>
      <div>
        {messages.map((message, index) => (
          <p key={index} className={message.role}>
            {message.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}