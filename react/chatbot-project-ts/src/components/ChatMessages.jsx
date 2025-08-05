import { useRef, useEffect } from 'react';

import ChatMessage from '../components/ChatMessage';

import './ChatMessages.css'

// auto-scroll hook
function useAutoScroll(dependencies) {
    // (initial value)
    const chatMessagesRef = useRef(null);

    useEffect(() => {
        const containerElem = chatMessagesRef.current;
        if (containerElem) {
            containerElem.scrollTop = containerElem.scrollHeight;
        }
    }, [dependencies]);

    return chatMessagesRef;
}

export default function ChatMessages({ chatMessages }) {

    const chatMessagesRef = useAutoScroll([chatMessages]);

    // (initial value)
    /*const chatMessagesRef = React.useRef();
  
    React.useEffect(() => {
      const containerElem = chatMessagesRef.current;
      if (containerElem) {
        containerElem.scrollTop = containerElem.scrollHeight;
      }
    }, [chatMessages]);*/

    return (
        <div className="chat-messages-container"
            ref={chatMessagesRef}>
            {chatMessages.length === 0 &&
                <p className="empty-chat-message">Welcome to the chatbot project! Send a message using the textbox below.</p>
            }
            {chatMessages.map(chatMessage => {
                return (
                    <ChatMessage
                        message={chatMessage.message}
                        sendDate={chatMessage.sendDate}
                        sender={chatMessage.sender}
                        key={chatMessage.id}
                    />
                );
            })}
        </div>
    )
}
