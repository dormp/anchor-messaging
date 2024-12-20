// Extremely messy styles for main page... needs cleaned up

// Imports
import React from 'react';

export const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
};

export const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    maxHeight: '80%',
    overflowY: 'auto',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
};

export const searchContainerStyle = {
    padding: '10px',
    borderBottom: '1px solid #e0e0e0'
};

export const searchInputWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: '20px',
    padding: '5px 10px'
};

export const searchInputStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    marginLeft: '10px',
    fontSize: '14px'
};

export const searchIconStyle = {
    color: '#65676b'
};

export const filterButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginLeft: '10px',
    color: '#65676b'
};

export const pageStyle = {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#0c0f29',
    color: 'white',
    overflow: 'hidden',
    margin: 0,
    padding: 0
};

export const contentStyle = {
    display: 'flex',
    height: '100%',
    width: '100%',
    overflow: 'hidden'
};

export const contactProfileWrapper = {
    position: 'relative',
    marginRight: '15px'
};

export const messengerLogoStyle = {
    position: 'absolute',
    bottom: '-5px',
    right: '-5px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'white',
    padding: '2px'
};

export const headerMessengerLogoStyle = {
    ...messengerLogoStyle,
    width: '25px',
    height: '25px'
};

export const unreadIndicatorStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#ff3b30'
};

export const messageDateGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '15px'
};

export const messageDateStyle = {
    color: '#aaa',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '0.8em',
    marginBottom: '10px'
};

export const topBarStyle = {
    height: '70px',
    backgroundColor: '#2c2c2c',
    borderBottom: '1px solid #444'
};

export const contactsHeaderStyle = {
    padding: '15px',
    height: '30px',
    borderBottom: '1px solid #444',
    paddingLeft: '80px',
    paddingTop: '25px',
    margin: 0
};

export const contactsScrollStyle = {
    overflowY: 'auto',
    flex: 1
    
};

export const contactProfilePicStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover'
};

export const placeholderProfilePicStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '15px',
    fontWeight: 'bold'
};

export const contactInfoStyle = {
    display: 'flex',
    flexDirection: 'column'
};

export const contactNameStyle = {
    fontWeight: 'bold'
};

export const contactTypeStyle = {
    fontSize: '0.8em',
    color: '#aaa'
};

export const chatContainerStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
};

export const chatHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#2c2c2c',
    borderBottom: '1px solid #444'
};

export const headerProfilePicStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    marginRight: '15px',
    objectFit: 'cover'
};

export const headerPlaceholderProfilePicStyle = {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#555',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '15px',
    fontWeight: 'bold'
};

export const chatHeaderTextStyle = {
    display: 'flex',
    flexDirection: 'column'
};

export const chatHeaderNameStyle = {
    fontWeight: 'bold',
    fontSize: '1.1em'
};

export const chatHeaderSubtextStyle = {
    fontSize: '0.8em',
    color: '#aaa'
};

export const messagesContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    overflowX: 'hidden',
    padding: '20px',
    display: 'flex',
    backgroundColor: '#1c1c1c',
    flexDirection: 'column'
    
};

export const messageWrapperStyle = (isSelf) => ({
    display: 'flex',
    justifyContent: isSelf ? 'flex-end' : 'flex-start',
    marginBottom: '10px'
});

export const messageStyle = (isSelf) => ({
    backgroundColor: isSelf ? '#4CAF50' : '#333',
    color: 'white',
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '70%',
    wordWrap: 'break-word'
});

export const messageInputContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '15px',
  backgroundColor: '#2c2c2c',
  borderTop: '1px solid #444'
};

export const messageInputStyle = {
    flex: 1,
    padding: '10px',
    backgroundColor: '#444',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    marginRight: '10px'
};

export const sendButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px'
};

export const selectContactPromptStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    color: '#888'
};

export const errorStyle = {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'red',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    zIndex: 1000
};

export const emojiButtonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0',
  height: '40px',
  width: '40px'
};

export const emojiPickerStyle = {
    position: 'absolute',
    bottom: '70px',
    right: '20px',
    zIndex: 1000
};

export const contactItemStyle = (isSelected, hasUnreadMessages, isFacebookContact) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '15px',
    cursor: 'pointer',
    position: 'relative',
    background: isFacebookContact 
        ? (hasUnreadMessages 
            ? 'linear-gradient(135deg, rgba(44, 62, 80, 0.7), rgba(52, 152, 219, 0.7))' 
            : 'linear-gradient(135deg, rgba(26, 41, 128, 0.5), rgba(38, 208, 206, 0.5))') 
        : (isSelected ? 'rgba(255,255,255,0.2)' : 'transparent'),
    borderBottom: '1px solid rgba(255,255,255,0.2)',
    transition: 'background-color 0.3s ease'
});

export const contactsContainerStyle = {
    width: '350px', 
    backgroundColor: '#2c2c2c', 
    borderRight: '1px solid rgba(255,255,255,0.1)', 
    display: 'flex', 
    flexDirection: 'column', 
    position: 'relative', 
    borderRight: '1px solid #444'
};

export const contactsScrollContainerStyle = {
    overflowY: 'scroll', 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column',
    paddingBottom: '60px', // Reduced padding to match bottom settings height
    overflowY: 'auto'
};

export const bottomSettingsStyle = {
    position: 'absolute',
    bottom: '0',
    left: '1px',
    width: '334px',  // Match the width of contacts sidebar
    backgroundColor: '#2c2c2c',
    borderRight: '1px solid #444',
    borderTop: '1px solid #444',
    paddingLeft: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '15px',
    height: '70px',
    zIndex: 10
};

export const bottomSettingsButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '5px',
    transition: 'color 0.3s ease'
};