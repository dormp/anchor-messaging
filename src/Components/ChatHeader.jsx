// Chat header components for messenger header and settings
// has settings modal, contact info modal, and main header with search

import React, { useState, useMemo } from 'react';
import { X, Settings, Info, Search } from 'lucide-react';
import facebookMessengerLogo from '../assets/facebookmessagerlogo.png';
import * as styles from '../Pages/MainPageStyles';

// Modal for chat display settings (just size adjustment right now)
const ChatSettingsModal = ({ isOpen, onClose, chatSize, onChatSizeChange }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.modalOverlayStyle}>
            <div style={styles.modalContentStyle}>
                <h2>Chat Settings</h2>
                <div>
                    <label>Chat Bubble Size: {chatSize}%</label>
                    <input 
                        type="range" 
                        min="50" 
                        max="200" 
                        value={chatSize} 
                        onChange={(e) => onChatSizeChange(parseInt(e.target.value))}
                        style={{width: '100%'}}
                    />
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

// Modal for showing contact information
const ContactInfoModal = ({ isOpen, onClose, contact }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.modalOverlayStyle}>
            <div style={styles.modalContentStyle}>
                <h2>Contact Info</h2>
                {contact.profile_pic ? (
                    <img 
                        src={contact.profile_pic} 
                        alt={contact.name} 
                        style={{
                            width: '100px', 
                            height: '100px', 
                            borderRadius: '50%', 
                            objectFit: 'cover',
                            margin: '0 auto 20px'
                        }} 
                    />
                ) : (
                    <div 
                        style={{
                            width: '100px', 
                            height: '100px', 
                            borderRadius: '50%', 
                            background: '#0078ff',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'white',
                            fontSize: '48px',
                            margin: '0 auto 20px'
                        }}
                    >
                        {contact.name.charAt(0)}
                    </div>
                )}
                <div style={{textAlign: 'center'}}>
                    <h3>{contact.name}</h3>
                    <p>{contact.type === 'facebook' ? 'Facebook Messenger' : contact.type}</p>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '20px'}}>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

// Main header component with contact info, search, and settings controls
const ChatHeader = ({ 
    selectedContact, 
    onClose, 
    messages,
    searchTerm,  
    onSearchTermChange,  
    chatSize,  
    onChatSizeChange  
}) => {
    const [showChatSettings, setShowChatSettings] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState(false);
    const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm || '');

    // Search functionality
    const searchResults = useMemo(() => {
        if (!localSearchTerm) return [];
        return messages.filter(message => 
            message.text.toLowerCase().includes(localSearchTerm.toLowerCase())
        );
    }, [messages, localSearchTerm]);

    // Update parent search state
    React.useEffect(() => {
        if (onSearchTermChange) {
            onSearchTermChange(localSearchTerm);
        }
    }, [localSearchTerm, onSearchTermChange]);

    return (
        <>
            <div style={{
                ...styles.chatHeaderStyle,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 15px'
            }}>
                <div style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '15px'
                }}>
                    <div style={styles.contactProfileWrapper}>
                        {selectedContact.profile_pic ? (
                            <img
                                src={selectedContact.profile_pic}
                                alt={selectedContact.name}
                                style={styles.headerProfilePicStyle}
                            />
                        ) : (
                            <div style={styles.headerPlaceholderProfilePicStyle}>
                                {selectedContact.name.charAt(0)}
                            </div>
                        )}
                        {selectedContact.type === 'facebook' && (
                            <img
                                src={facebookMessengerLogo}
                                alt="Facebook Messenger"
                                style={styles.headerMessengerLogoStyle}
                            />
                        )}
                    </div>
                    <div style={styles.chatHeaderTextStyle}>
                        <div style={styles.chatHeaderNameStyle}>{selectedContact.name}</div>
                        <div style={styles.chatHeaderSubtextStyle}>
                            {selectedContact.type === 'facebook'
                                ? 'Facebook Messenger'
                                : selectedContact.type}
                        </div>
                    </div>
                </div>
                {/* Searching section */}
                <div style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    flex: 1, 
                    justifyContent: 'center',
                    margin: '0 20px'
                }}>
                    <div style={styles.searchInputWrapperStyle}>
                        <Search size={20} style={styles.searchIconStyle} />
                        <input 
                            type="text" 
                            placeholder="Search messages..." 
                            value={localSearchTerm}
                            onChange={(e) => {
                                const newSearchTerm = e.target.value;
                                setLocalSearchTerm(newSearchTerm);
                            }}
                            style={{
                                ...styles.searchInputStyle,
                                color: 'white'
                            }}
                        />
                        {localSearchTerm && (
                            <div style={{
                                marginLeft: '10px',
                                color: '#aaa',
                                fontSize: '14px'
                            }}>
                                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Controls section */}
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <button
                        onClick={() => setShowContactInfo(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}
                    >
                        <Info size={20} color="gray" />
                    </button>
                    <button
                        onClick={() => setShowChatSettings(true)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            marginRight: '10px'
                        }}
                    >
                        <Settings size={20} color="gray" />
                    </button>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <X size={24} color="gray" />
                    </button>
                </div>
            </div>


            <ChatSettingsModal 
                isOpen={showChatSettings}
                onClose={() => setShowChatSettings(false)}
                chatSize={chatSize}
                onChatSizeChange={onChatSizeChange}
            />

            <ContactInfoModal 
                isOpen={showContactInfo}
                onClose={() => setShowContactInfo(false)}
                contact={selectedContact}
            />
        </>
    );
};

export default ChatHeader;