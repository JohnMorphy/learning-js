import RobotProfileImage from '../assets/chatbot-resources/robot.png';
import UserProfileImage from '../assets/chatbot-resources/profile-1.jpg';

import './ChatMessage.css'

export default function ChatMessage(props) {
    const { message, sendDate, sender } = props;

    console.log(sendDate);

    return (
        <div className={
            sender === 'robot' ? "chat-message-robot" : "chat-message-user"
        }>
            {sender === 'robot' &&
                <img
                    src={RobotProfileImage}
                    alt="robot image"
                    className="chat-message-profile"
                />}
            <div className="chat-message-text">{message}
                {sendDate && (
                    <div className="chat-message-date">
                        {sendDate}
                    </div>
                )}
            </div>
            {sender === 'user' &&
                <img src={UserProfileImage}
                    alt="user image"
                    className="chat-message-profile"
                />}

        </div>
    )

}