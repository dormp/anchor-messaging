// Bottom bar componenet for sending messages

// Imports
import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import * as styles from '../Pages/MainPageStyles';

// Message Input
const MessageInput = ({
    sendMessage,
    selectedContact
}) => {
    // State Management
    const [newMessage, setNewMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [currentEmoji, setCurrentEmoji] = useState('😊');

    // Emoji Configuration
    const hoverEmojis = [
        '😂', '😍', '🤔', '😎', '🤪', '😇', 
        '🥳', '🤨', '😱', '🤯', '😴', '🤓'
    ];

    // funny Emoji Interaction so emoji changes when you hover it 
    const handleEmojiHover = () => {
        const randomEmoji = hoverEmojis[Math.floor(Math.random() * hoverEmojis.length)];
        setCurrentEmoji(randomEmoji);
    };

    const handleEmojiLeave = () => {
        setCurrentEmoji('😊');
    };

    const handleEmojiClick = (emojiObject) => {
        setNewMessage(prevMessage => prevMessage + emojiObject.emoji);
        setShowEmojiPicker(false);
    };

    // Message Input Handlers
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    const handleSendMessage = () => {
        if (!newMessage.trim() || !selectedContact) return;

        sendMessage(newMessage, selectedContact);
        setNewMessage('');
        setShowEmojiPicker(false);
    };

    // Render
    return (
        <div style={styles.messageInputContainerStyle}>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                style={styles.messageInputStyle}
            />
            <div style={{display: 'flex', alignItems: 'center'}}>
                <button
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    onMouseEnter={handleEmojiHover}
                    onMouseLeave={handleEmojiLeave}
                    style={styles.emojiButtonStyle}
                >
                    {currentEmoji}
                </button>
                <button
                    onClick={() => {}}
                    style={{
                        ...styles.emojiButtonStyle,
                        marginLeft: '10px'
                    }}
                >
                    <Paperclip size={20} color="white" />
                </button>
            </div>
            {showEmojiPicker && (
                <div style={styles.emojiPickerStyle}>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
            )}
            <button
                onClick={handleSendMessage}
                style={styles.sendButtonStyle}
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;