// Chat sidebar component for displaying chat list
// has search, filtering, and individual chat components


import React, { useMemo } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import facebookMessengerLogo from '../assets/facebookmessagerlogo.png';
import * as styles from '../Pages/MainPageStyles';

// Main sidebar component handling chat list and search
const ChatSidebar = ({
    chats,
    searchTerm,
    setSearchTerm,
    setShowFilterModal,
    selectedContact,
    setSelectedContact,
    unreadMessages,
    messages
}) => {
    // Filter and sort chats based on search term and unread
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

    // Get most recent message
    const getLastMessage = (chatId) => {
        const chatMessages = messages[chatId] || [];
        return chatMessages.length > 0
            ? chatMessages[chatMessages.length - 1]
            : null;
    };

    return (
        <div style={styles.contactsContainerStyle}>
            {/* Add Chats */}
            <div style={styles.topBarStyle}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%',
                    padding: '0 15px'
                }}>
                    <div style={{
                        flexGrow: 1,
                        textAlign: 'right',
                    }}>
                        <h2 style={{
                            ...styles.chatHeaderNameStyle,
                            margin: 0,
                            display: 'inline-block'
                        }}>
                            Add Chats
                        </h2>
                    </div>
                    <button 
                        style={{
                            background: 'none', 
                            border: 'none', 
                            color: 'white', 
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingRight: '41px',
                            transition: 'opacity 0.3s ease'
                        }}
                        onClick={() => {
                            console.log('Add new chat clicked');
                        }}
                        title="Add Chats"
                    >
                        <Plus size={20} />
                    </button>
                </div>
            </div>
           
            {/* Search and filter */}
            <div style={styles.searchContainerStyle}>
                <div style={styles.searchInputWrapperStyle}>
                    <Search size={20} style={styles.searchIconStyle} />
                    <input
                        type="text"
                        placeholder="Search chats..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.searchInputStyle}
                    />
                    <button
                        onClick={() => setShowFilterModal(true)}
                        style={styles.filterButtonStyle}
                    >
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Chat list */}
            <div style={styles.contactsScrollContainerStyle}>
                {filteredChats.length === 0 && (
                    <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
                        No chats found
                    </div>
                )}
                {filteredChats.map(chat => (
                    <ChatItem
                        key={chat.id}
                        chat={chat}
                        selectedContact={selectedContact}
                        unreadMessages={unreadMessages}
                        lastMessage={getLastMessage(chat.id)}
                        onSelect={() => setSelectedContact(chat)}
                    />
                ))}
            </div>
        </div>
    );
};

// Individual chat component displaying contact info and last message said
const ChatItem = ({
    chat,
    selectedContact,
    unreadMessages,
    lastMessage,
    onSelect
}) => {
    const unreadCount = unreadMessages[chat.id] || 0;
    const hasUnreadMessages = unreadCount > 0;

    return (
        <div
            style={styles.contactItemStyle(
                chat.id === selectedContact?.id,
                hasUnreadMessages,
                chat.type === 'facebook'
            )}
            onClick={onSelect}
        >
            {/* Contact profile picture */}
            <div style={styles.contactProfileWrapper}>
                {chat.profile_pic ? (
                    <img
                        src={chat.profile_pic}
                        alt={chat.name}
                        style={{
                            ...styles.contactProfilePicStyle,
                            border: hasUnreadMessages
                                ? '2px solid #0078ff'
                                : '1px solid rgba(0,0,0,0.1)'
                        }}
                    />
                ) : (
                    <div
                        style={{
                            ...styles.placeholderProfilePicStyle,
                            background: hasUnreadMessages
                                ? 'linear-gradient(to right, #0078ff, #00c6ff)'
                                : 'rgba(0,0,0,0.1)'
                        }}
                    >
                        {chat.name.charAt(0)}
                    </div>
                )}
                {chat.type === 'facebook' && (
                    <img
                        src={facebookMessengerLogo}
                        alt="Facebook Messenger"
                        style={styles.messengerLogoStyle}
                    />
                )}
            </div>

            {/* Contact info and last message */}
           <div style={styles.contactInfoStyle}>
                <div
                    style={{
                        ...styles.contactNameStyle,
                        fontWeight: hasUnreadMessages ? 'bold' : 'normal'
                    }}
                >
                    {chat.name}
                    {hasUnreadMessages && (
                        <span
                            style={{
                                marginLeft: '10px',
                                backgroundColor: '#0078ff',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                fontSize: '10px'
                            }}
                        >
                            {unreadCount}
                        </span>
                    )}
                </div>
                <div
                    style={{
                        ...styles.contactTypeStyle,
                        color: hasUnreadMessages ? 'white' : 'rgba(255,255,255,0.7)'
                    }}
                >
                    {chat.type === 'facebook' ? 'Facebook Messenger' : chat.type}
                </div>
                {lastMessage && (
                    <div
                        style={{
                            fontSize: '12px',
                            color: hasUnreadMessages ? 'white' : 'rgba(255,255,255,0.7)',
                            marginTop: '5px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                        }}
                    >
                        {lastMessage.text.slice(0, 30) + (lastMessage.text.length > 30 ? '...' : '')}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatSidebar;