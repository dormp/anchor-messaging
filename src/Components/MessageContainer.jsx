//Component where all the text messages go, includes the text input bar, emojis, and file upload button, but file upload dont work yet

// Imports 
import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import * as styles from '../Pages/MainPageStyles';
import { ChevronUp, ChevronDown } from 'lucide-react';

// fun ASCII Background 
const AsciiBackground = () => {
    const asciiAnchor = `
         d8888 888b    888  .d8888b.  888    888  .d88888b.  8888888b.  
        d88888 8888b   888 d88P  Y88b 888    888 d88P" "Y88b 888   Y88b 
       d88P888 88888b  888 888    888 888    888 888     888 888    888 
      d88P 888 888Y88b 888 888        8888888888 888     888 888   d88P 
     d88P  888 888 Y88b888 888        888    888 888     888 8888888P"  
    d88P   888 888  Y88888 888    888 888    888 888     888 888 T88b   
   d8888888888 888   Y8888 Y88b  d88P 888    888 Y88b. .d88P 888  T88b  
  d88P     888 888    Y888  "Y8888P"  888    888  "Y88888P"  888   T88b 
                                                                        
    `;
  
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
        userSelect: 'none',
        color: 'rgba(200,200,200,0.08)',
        fontFamily: 'monospace',
        textAlign: 'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: '1.2em',
        overflow: 'hidden'
      }}>
        <pre style={{marginBottom: '20px'}}>{asciiAnchor}</pre>
      </div>
    );
  };
  
  // Main Messages Container
  const MessagesContainer = ({ 
      selectedContact, 
      messages, 
      searchTerm = '', 
      chatSize = 100
  }) => {
      // State Management
      const [searchResults, setSearchResults] = useState([]);
      const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
      const messagesContainerRef = useRef(null);
      const searchResultRefs = useRef([]);
  
      // Search Results Processing
      useEffect(() => {
          if (!searchTerm) {
              setSearchResults([]);
              setCurrentSearchIndex(0);
              return;
          }
  
          const matches = messages.reduce((acc, msg, msgIndex) => {
              const matches = [];
              const regex = new RegExp(searchTerm, 'gi');
              let match;
              
              while ((match = regex.exec(msg.text)) !== null) {
                  acc.push({
                      msgIndex,
                      matchIndex: match.index,
                      message: msg
                  });
              }
  
              return acc;
          }, []);
  
          matches.sort((a, b) => 
              a.msgIndex !== b.msgIndex 
                  ? a.msgIndex - b.msgIndex 
                  : a.matchIndex - b.matchIndex
          );
  
          setSearchResults(matches);
          setCurrentSearchIndex(matches.length > 0 ? 0 : -1);
      }, [searchTerm, messages]);
  
      // Search Result Navigation
      useEffect(() => {
          if (currentSearchIndex >= 0 && searchResultRefs.current[currentSearchIndex]) {
              searchResultRefs.current[currentSearchIndex].scrollIntoView({
                  behavior: 'smooth',
                  block: 'center'
              });
          }
      }, [currentSearchIndex]);
  
      // Message Grouping by Date
      const groupedMessages = useMemo(() => {
          if (!selectedContact || !messages) return {};
  
          return messages.reduce((acc, msg) => {
              const date = new Date(msg.timestamp).toLocaleDateString();
              if (!acc[date]) acc[date] = [];
              acc[date].push(msg);
              return acc;
          }, {});
      }, [messages, selectedContact]);
  
      // Date Formatting
      const formatMessageDate = (timestamp) => {
          const date = new Date(timestamp);
          const today = new Date();
          const isToday = date.toDateString() === today.toDateString();
  
          if (isToday) {
              return date.toLocaleString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
              });
          } else {
              return date.toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
              });
          }
      };
  
      // Highlighting
      const highlightText = (text, term) => {
          if (!term) return text;
  
          const regex = new RegExp(`(${term})`, 'gi');
          const parts = text.split(regex);
  
          return parts.map((part, index) => 
              regex.test(part) ? (
                  <mark 
                      key={index} 
                      style={{ 
                          backgroundColor: 'yellow', 
                          fontWeight: 'bold',
                          color: 'black'
                      }}
                  >
                      {part}
                  </mark>
              ) : (
                  part
              )
          );
      };
  
      // Style Calculations idrk
      const calculateMessageStyles = (isMe) => {
          const baseStyle = styles.messageStyle(isMe);
          return {
              ...baseStyle,
              fontSize: `${chatSize / 100 * 16}px`,
              padding: `${chatSize * 0.1}px ${chatSize * 0.2}px`,
              maxWidth: `${chatSize * 1.2}%`
          };
      };
  
      const calculateMessageWrapperStyles = (isMe) => {
          const baseStyle = styles.messageWrapperStyle(isMe);
          return {
              ...baseStyle,
              margin: `${chatSize * 0.1}px 0`
          };
      };
  
      // Search Results Navigation
      const navigateSearchResults = (direction) => {
          if (searchResults.length === 0) return;
  
          const newIndex = direction === 'next' 
              ? (currentSearchIndex + 1) % searchResults.length
              : (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
  
          setCurrentSearchIndex(newIndex);
      };
  
      // Render
      return (
          <div style={{...styles.messagesContainerStyle, position: 'relative'}}>
              {searchTerm && searchResults.length > 0 && (
                  <div style={{
                      position: 'fixed',
                      bottom: '80px',
                      right: '20px',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      padding: '10px',
                      borderRadius: '5px',
                      display: 'flex',
                      alignItems: 'center',
                      zIndex: 1000
                  }}>
                      <button 
                          onClick={() => navigateSearchResults('prev')}
                          style={{
                              background: 'none', 
                              border: 'none', 
                              color: 'white', 
                              cursor: 'pointer'
                          }}
                      >
                          <ChevronUp />
                      </button>
                      <span style={{margin: '0 10px'}}>
                          {searchResults.length > 0 ? `${currentSearchIndex + 1} / ${searchResults.length}` : '0'}
                      </span>
                      <button 
                          onClick={() => navigateSearchResults('next')}
                          style={{
                              background: 'none', 
                              border: 'none', 
                              color: 'white', 
                              cursor: 'pointer'
                          }}
                      >
                          <ChevronDown />
                      </button>
                  </div>
              )}
              
              <AsciiBackground />
              <div ref={messagesContainerRef}>
                  {Object.entries(groupedMessages).map(([date, msgs]) => (
                      <React.Fragment key={date}>
                          <div style={{
                              ...styles.messageDateStyle,
                              textAlign: 'center',
                              width: '100%',
                              zIndex: 2,
                              position: 'relative',
                              fontSize: `${chatSize / 100 * 14}px`
                          }}>
                              {formatMessageDate(msgs[0].timestamp)}
                          </div>
                      
                          {msgs.map((msg, msgIndex) => {
                              const isSearchMatch = searchTerm && 
                                  msg.text.toLowerCase().includes(searchTerm.toLowerCase());
  
                              const messageSearchResults = searchResults.filter(
                                  result => result.message.id === msg.id
                              );
  
                              return (
                                  <div
                                      key={msg.id || msgIndex}
                                      ref={el => {
                                          if (messageSearchResults.length > 0) {
                                              searchResultRefs.current = 
                                                  searchResultRefs.current.filter(r => r !== null);
                                              searchResultRefs.current.push(el);
                                          }
                                      }}
                                      style={{
                                          ...calculateMessageWrapperStyles(msg.sender.id === 'me'),
                                          zIndex: 2,
                                          position: 'relative',
                                          ...(isSearchMatch ? { 
                                              boxShadow: '0 0 10px rgba(255, 255, 0, 0.5)',
                                              backgroundColor: 'rgba(255, 255, 0, 0.1)'
                                          } : {})
                                      }}
                                  >
                                      <div
                                          style={calculateMessageStyles(msg.sender.id === 'me')}
                                      >
                                          {highlightText(msg.text, searchTerm)}
                                      </div>
                                  </div>
                              );
                          })}
                      </React.Fragment>
                  ))}
              </div>
          </div>
      );
  };
  
  export default MessagesContainer;