import { useState, useEffect } from 'react';

import ChatInput from './components/ChatInput';
import ChatMessages from './components/ChatMessages';

import './App.css';
import { Chatbot } from 'supersimpledev';
import dayjs from 'dayjs';

function howLongTillChristmas() {
  return `${dayjs('2025-12-25').diff(dayjs(), 'days')} days till christmas`;
}

function App() {
  const [chatMessages, setChatMessages] = useState(JSON.parse(localStorage.getItem('chatmessages')) || []);

  useEffect(() => {
    console.log(Chatbot);
    Chatbot.addResponses({ "christmas": howLongTillChristmas, "mama": "just killed a man", "put a gun against his head": "pulled my trigger now he is dead" });
  }, []);

  useEffect(() => {
    localStorage.setItem("chatmessages", JSON.stringify(chatMessages));
  }, [chatMessages])

  console.log(chatMessages)

  return (
    <>
      <title>{`${chatMessages.length} Messages`}</title>
      <link rel="icon" type="image" href="/chatbot-resources/robot.png" />

      <div className="app-container">
        <ChatMessages
          chatMessages={chatMessages}
        />
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
      </div>
    </>
  );
}

export default App
