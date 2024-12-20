// Bottom settings component (this is in the bottom left, and is for managing account, general settings, info, and updates buttons, all buttons are currently modals)

// Imports
import React, { useState } from 'react';
import { Settings, Info, RefreshCw, User } from 'lucide-react';
import * as styles from '../Pages/MainPageStyles';

// Modal Wrapper
const ModalWrapper = ({ children, onClose }) => {
    return (
        <div style={styles.modalOverlayStyle}>
            <div style={styles.modalContentStyle}>
                {children}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'none',
                        border: 'none',
                        fontSize: '20px',
                        cursor: 'pointer',
                        color: 'black'
                    }}
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

// Settings Modal
const AccountSettingsModal = ({ onClose }) => (
    <ModalWrapper onClose={onClose}>
        <h2>Account Settings</h2>
        {/* Account settings */}
    </ModalWrapper>
);

const GeneralSettingsModal = ({ onClose }) => (
    <ModalWrapper onClose={onClose}>
        <h2>General Settings</h2>
        {/* General settings */}
    </ModalWrapper>
);

const AboutModal = ({ onClose }) => (
    <ModalWrapper onClose={onClose}>
        <h2>About</h2>
        {/* About */}
    </ModalWrapper>
);

const UpdatesModal = ({ onClose }) => (
    <ModalWrapper onClose={onClose}>
        <h2>Updates</h2>
        {/* Updates */}
    </ModalWrapper>
);

// Main Bottom Settings
const BottomSettings = () => {
    // State Management
    const [activeModal, setActiveModal] = useState(null);

    // Modal Rendering
    const renderModal = () => {
        switch(activeModal) {
            case 'account':
                return <AccountSettingsModal onClose={() => setActiveModal(null)} />;
            case 'general':
                return <GeneralSettingsModal onClose={() => setActiveModal(null)} />;
            case 'about':
                return <AboutModal onClose={() => setActiveModal(null)} />;
            case 'updates':
                return <UpdatesModal onClose={() => setActiveModal(null)} />;
            default:
                return null;
        }
    };

    // Button Configuration
    const settingsButtons = [
        {
            key: 'account',
            icon: <User size={20} color="#aaa" />,
            label: 'Account Settings'
        },
        {
            key: 'general',
            icon: <Settings size={20} color="#aaa" />,
            label: 'General Settings'
        },
        {
            key: 'about',
            icon: <Info size={20} color="#aaa" />,
            label: 'About'
        },
        {
            key: 'updates',
            icon: <RefreshCw size={20} color="#aaa" />,
            label: 'Updates'
        }
    ];

    // Rendering
    return (
        <div style={styles.bottomSettingsStyle}>
            {renderModal()}

            {/* Settings Buttons */}
            {settingsButtons.map(button => (
                <button
                    key={button.key}
                    onClick={() => setActiveModal(button.key)}
                    style={styles.bottomSettingsButtonStyle}
                    aria-label={button.label}
                >
                    {button.icon}
                </button>
            ))}
        </div>
    );
};

export default BottomSettings;