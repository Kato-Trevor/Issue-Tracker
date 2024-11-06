'use client'

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [input, setInput] = useState('');
  const [chatResponse, setChatResponse] = useState();

  const sendMessage = async () => {
    const response = await axios.post('/api/groq', {
      message: input,
    });
    setChatResponse(response.data)
    setInput('');
  };

  return (
    <div>
      <h1>Chat with our AI assitant</h1>
      <div>
        <p>
          {chatResponse}
        </p>
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