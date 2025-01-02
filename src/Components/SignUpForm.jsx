// Signup compoment seen in the starter/landing page

import React, { useState } from 'react';

const SignUpForm = () => {
    // State management
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
        } else if (!agreeTerms) {
            alert("You must agree to the terms and privacy policy.");
        } else {
            alert("Sign up successful!");
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    style={inputStyle}
                />
                <input
                    type="email"
                    placeholder="Email"
                    style={inputStyle}
                />
                <input
                    type="password"
                    placeholder="Password"
                    style={inputStyle}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    style={inputStyle}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <div style={checkboxContainerStyle}>
                    <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={() => setAgreeTerms(!agreeTerms)}
                    />
                    <label style={checkboxLabelStyle}>
                        I agree to the <a href="/terms" style={linkStyle}>Terms of Service</a> and <a href="/privacy" style={linkStyle}>Privacy Policy</a>.
                    </label>
                </div>
                <button type="submit" style={submitButtonStyle}>Sign Up</button>
            </form>
        </div>
    );
};

//styles
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
    backgroundColor: '#FFA500',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
};

const checkboxContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px',
    marginBottom: '10px',
};

const checkboxLabelStyle = {
    color: '#ddd',
    marginLeft: '10px',
};

const linkStyle = {
    color: '#9400D3',
    textDecoration: 'none',
};

export default SignUpForm;