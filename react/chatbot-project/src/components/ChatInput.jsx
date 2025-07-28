import { useState } from 'react';
import { Chatbot } from 'supersimpledev';

import LoaderImage from '../assets/chatbot-resources/loading-spinner.gif';

import './ChatInput.css'

export default function ChatInput({ chatMessages, setChatMessages }) {

    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // value + updater function

    function saveInputText(event) {
        setInputText(event.target.value);
        console.log(inputText)
    }

    async function sendMessage() {

        if (inputText === '' || isLoading) {
            return;
        }

        setIsLoading(true);

        const newChatMessages = [
            ...chatMessages,
            {
                message: inputText,
                sender: 'user',
                id: crypto.randomUUID()
            }
        ];
        setChatMessages(newChatMessages);
        setInputText('');

        setChatMessages(
            [
                ...newChatMessages,
                {
                    message: <img className="spinner" src={LoaderImage} />,
                    sender: 'robot',
                    id: crypto.randomUUID()
                }
            ]
        );

        console.log(Chatbot);
        const chatbotResponse = await Chatbot.getResponseAsync(inputText);

        setChatMessages(
            [
                ...newChatMessages,
                {
                    message: chatbotResponse,
                    sender: 'robot',
                    id: crypto.randomUUID()
                }
            ]
        );


        setIsLoading(false);
    }

    function sendOnEnter(event) {
        if (event.key === "Enter") {
            sendMessage();
        }

        if (event.key === "Escape") {
            setInputText('');
        }
    }

    return (
        <div className="input-container">
            <input
                placeholder="Send a message to Chatbot"
                type="text"
                size="30"
                onChange={saveInputText}
                onKeyDown={sendOnEnter}
                value={inputText}
                className="user-input"
            />
            <button
                onClick={sendMessage}
                className="send-button"
            >
                Send
            </button>
        </div>
    );
}
