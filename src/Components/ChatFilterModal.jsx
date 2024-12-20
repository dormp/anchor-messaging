// ChatFilterModal component for filtering chat conversations based on keywords

// Imports
import React, { useState } from 'react';
import * as styles from '../Pages/MainPageStyles';

const ChatFilterModal = ({ isOpen, onClose, onApplyFilters }) => {
    const [filters, setFilters] = useState({
        unreadOnly: false,
        dateRange: null,
    });

    if (!isOpen) return null;

    return (
        <div style={styles.modalOverlayStyle}>
            <div style={styles.modalContentStyle}>
                <h2>Chat Filters</h2>
                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={filters.unreadOnly}
                            onChange={(e) => setFilters({...filters, unreadOnly: e.target.checked})}
                        />
                        Unread Chats Only
                    </label>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                    <button onClick={() => onApplyFilters(filters)}>Apply</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ChatFilterModal;