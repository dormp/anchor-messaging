// login compoment seen in the starter/landing page

// Imports
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    // State management
    const [email, setEmail] = useState('demo@example.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Event handling
    const handleSubmit = (e) => {
        e.preventDefault();

        // login validation
        if (email === 'demo@example.com' && password === 'password123') {
            navigate('/main');
        } else {
            setError("Invalid username or password.");
        }
    };

    // Render
    return (
        <div>
            <h2>Login</h2>
            {error && <p style={errorStyle}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    style={inputStyle}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" style={submitButtonStyle}>Login</button>
            </form>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px -10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#333',
    color: '#fff',
};

const submitButtonStyle = {
    backgroundColor: '#4CAF50', // login button color
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    marginTop: '5px',
};

const errorStyle = {
    color: 'red',
    marginBottom: '10px',
};

export default LoginForm;