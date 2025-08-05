import { useState } from 'react'
import { Chatbot } from 'supersimpledev'

import LoaderImage from '../assets/chatbot-resources/loading-spinner.gif'

import './ChatInput.css'
import dayjs from 'dayjs';

export default function ChatInput({ chatMessages, setChatMessages }) {

    const [inputText, setInputText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    // value + updater function

    function saveInputText(event) {
        setInputText(event.target.value);
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
                id: crypto.randomUUID(),
                sendDate: dayjs().format("YYYY-MM-DD, HH:mm:ss"),
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

        const chatbotResponse = await Chatbot.getResponseAsync(inputText);

        setChatMessages(
            [
                ...newChatMessages,
                {
                    message: chatbotResponse,
                    sender: 'robot',
                    id: crypto.randomUUID(),
                    sendDate: dayjs().format("YYYY-MM-DD, HH:mm:ss"),
                }
            ]
        );


        setIsLoading(false);
    }

    function clearMessages() {
        setChatMessages([]);
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
            <button
                onClick={clearMessages}
                className="clear-button"
            >
                Clear
            </button>
        </div>
    );
}
