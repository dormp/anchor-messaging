// Reusable Button component resource

import React from 'react';

const Button = ({ text, onClick, style }) => {
    return (
        <button onClick={onClick} style={{ ...defaultButtonStyle, ...style }}>
            {text}
        </button>
    );
};

const defaultButtonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
};

export default Button;
