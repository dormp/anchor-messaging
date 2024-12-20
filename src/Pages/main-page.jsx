// Main messenging interface where user can send and receive messages (eventually from different platforms too)

// Imports
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import * as styles from './MainPageStyles';
import ChatFilterModal from '../Components/ChatFilterModal';
import ChatSidebar from '../Components/ChatSidebar';
import ChatHeader from '../Components/ChatHeader';
import MessagesContainer from '../Components/MessageContainer';
import MessageInput from '../Components/MessageInput';
import BottomSettings from '../Components/BottomSettings';
import AnchorLogoGrey from '../assets/AnchorLogoGrey.png';

const MainPage = () => {
    // State Management
    const [allMessages, setAllMessages] = useState([]);
    const [error, setError] = useState('');
    const [selectedContact, setSelectedContact] = useState(null);
    const [chats, setChats] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [activeFilters, setActiveFilters] = useState({});
    const [chatSize, setChatSize] = useState(100);

    // Message Organization
    const messagesByContact = useMemo(() => {
        return allMessages.reduce((acc, msg) => {
            const contactId = msg.sender.id === 'me' ? msg.contactId : msg.sender.id;
            if (!acc[contactId]) acc[contactId] = [];
            acc[contactId].push(msg);
            return acc;
        }, {});
    }, [allMessages]);

    // Message Management
    const sendMessage = async (messageText, contact) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/send-message`, {
                contactId: contact.id,
                message: messageText
            });
            setAllMessages(prevMessages => [...prevMessages, response.data.message]);
        } catch (error) {
            console.error('Send message error:', error);
            setError('Failed to send message');
        }
    };

    // Contact Management
    const fetchChats = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/facebook-chats`);
            setChats(response.data.chats);
        } catch (error) {
            console.error('Chats fetch error:', error);
            setError('Failed to fetch chats');
        }
    };

    // Message Fetching
    const fetchMessages = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/messages`, {
                params: { limit: null }
            });
            const newMessages = response.data.messages;

            // Update messages while preventing duplicates
            setAllMessages(prevMessages => {
                const uniqueMessages = [...prevMessages];
                newMessages.forEach(newMsg => {
                    const isDuplicate = prevMessages.some(msg => msg.id === newMsg.id);
                    if (!isDuplicate) {
                        uniqueMessages.push(newMsg);
                    }
                });
                return uniqueMessages;
            });

            // Update unread message count
            const newUnreadMessages = {};
            newMessages
                .filter(msg => msg.sender.id !== 'me' && !msg.read)
                .forEach(msg => {
                    const contactId = msg.sender.id;
                    if (!selectedContact || selectedContact.id !== contactId) {
                        newUnreadMessages[contactId] = (newUnreadMessages[contactId] || 0) + 1;
                    }
                });

            setUnreadMessages(prevUnread => {
                const updatedUnread = { ...prevUnread };
                Object.entries(newUnreadMessages).forEach(([contactId, count]) => {
                    if (!selectedContact || selectedContact.id !== contactId) {
                        updatedUnread[contactId] = (updatedUnread[contactId] || 0) + count;
                    }
                });
                return updatedUnread;
            });
        } catch (error) {
            console.error('Messages fetch error:', error);
            setError('Failed to fetch messages');
        }
    };

    // Message Read Status
    const markContactAsRead = async (contactId) => {
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/mark-messages-read`, {
                contactId: contactId
            });
            const newUnreadMessages = { ...unreadMessages };
            delete newUnreadMessages[contactId];
            setUnreadMessages(newUnreadMessages);
        } catch (error) {
            console.error('Mark messages read error:', error);
        }
    };

    // Contact Selection
    const handleContactSelect = (contact) => {
        setSelectedContact(contact);
        markContactAsRead(contact.id);
    };

    const closeChat = () => {
        setSelectedContact(null);
    };

    // Data Refresh
    useEffect(() => {
        fetchChats();
        fetchMessages();
       
        const chatInterval = setInterval(fetchChats, 30000);
        const messageInterval = setInterval(fetchMessages, 5000);

        return () => {
            clearInterval(chatInterval);
            clearInterval(messageInterval);
        };
    }, [selectedContact]);

    // Chat Filtering and Sorting
    const filteredChats = useMemo(() => {
        return chats
            .filter(chat => 
                chat.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                const aUnread = unreadMessages[a.id] ? 0 : 1;
                const bUnread = unreadMessages[b.id] ? 0 : 1;
                return aUnread - bUnread;
            });
    }, [chats, searchTerm, unreadMessages]);

    // Page Refresh 
    const handleRefreshPage = () => {
        window.location.reload();
    };

    // Component Rendering
    return (
        <div style={styles.pageStyle}>
            {/* Logo in upper left*/}
            <img 
                src={AnchorLogoGrey} 
                alt="Anchor Messenger Logo" 
                onClick={handleRefreshPage}
                style={{
                    position: 'absolute', 
                    top: '0px', 
                    left: '0px', 
                    width: '75px', 
                    height: '75px', 
                    cursor: 'pointer',
                    zIndex: 10
                }} 
            />

            <div style={styles.contentStyle}>
                {/* Sidebar Components */}
                <ChatSidebar
                    chats={filteredChats}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    setShowFilterModal={setShowFilterModal}
                    selectedContact={selectedContact}
                    setSelectedContact={handleContactSelect}
                    unreadMessages={unreadMessages}
                    messages={messagesByContact}
                />

                <ChatFilterModal
                    isOpen={showFilterModal}
                    onClose={() => setShowFilterModal(false)}
                    onApplyFilters={(filters) => {
                        setActiveFilters(filters);
                        setShowFilterModal(false);
                    }}
                />

                {/* Main Chat Container */}
                <div style={styles.chatContainerStyle}>
                    {selectedContact ? (
                        <>
                            <ChatHeader
                                selectedContact={selectedContact}
                                onClose={closeChat}
                                messages={messagesByContact[selectedContact.id] || []}
                                searchTerm={searchTerm}
                                onSearchTermChange={setSearchTerm}
                                chatSize={chatSize}
                                onChatSizeChange={setChatSize}
                            />

                            <MessagesContainer
                                selectedContact={selectedContact}
                                messages={messagesByContact[selectedContact.id] || []}
                                searchTerm={searchTerm}
                                chatSize={chatSize}
                            />

                            <MessageInput
                                sendMessage={sendMessage}
                                selectedContact={selectedContact}
                            />
                        </>
                    ) : (
                        <div style={styles.selectContactPromptStyle}>
                            Select a contact to start messaging
                        </div>
                    )}
                </div>

                {/* Settings */}
                <BottomSettings />
            </div>

            {/* Error Display */}
            {error && (
                <div style={styles.errorStyle}>
                    {error}
                    <button
                        onClick={() => setError('')}
                        style={{marginLeft: '10px', background: 'none', color: 'white', border: 'none'}}
                    >
                        Dismiss
                    </button>
                </div>
            )}
        </div>
    );
};

export default MainPage;