import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';
import Modal from '../Components/Modal';
import SignUpForm from '../Components/SignUpForm';
import LoginForm from '../Components/LoginForm';
import logo from '../assets/anchorlogo.png';

const StarterPage = () => {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate();

    const handleOpenSignUp = () => setIsSignUpOpen(true);
    const handleCloseSignUp = () => setIsSignUpOpen(false);
    const handleOpenLogin = () => setIsLoginOpen(true);
    const handleCloseLogin = () => setIsLoginOpen(false);

    const handleLogin = () => {
        setIsLoginOpen(false); // Close login modal
        navigate('/main'); // Navigate to MainPage
    };

    return (
        <div style={pageStyle}>
            <div style={contentContainer}>
                <div style={infoBoxStyle}>
                    <h2>Why Choose Chat Aggregator?</h2>
                    <p>Keep all your messaging apps in one place for seamless communication. Say goodbye to juggling multiple apps!</p>
                </div>

                <div style={formContainer}>
                    <img src={logo} alt="Logo" style={logoStyle} />
                    <h1 style={headerStyle}>Welcome to Chat Aggregator</h1>
                    <p style={infoTextStyle}>Aggregate all your messaging apps into one place. Stay connected effortlessly.</p>

                    <div style={buttonContainer}>
                        <Button text="Log In" style={loginButtonStyle} onClick={handleOpenLogin} />
                        <p style={orTextStyle}>or</p>
                        <Button text="Sign Up" style={signUpButtonStyle} onClick={handleOpenSignUp} />
                    </div>
                </div>

                <div style={infoBoxStyle}>
                    <h2>Secure & Easy to Use</h2>
                    <p>Stay protected with top-tier security and enjoy a smooth, user-friendly experience across all devices.</p>
                </div>
            </div>

            <Modal isOpen={isSignUpOpen} onClose={handleCloseSignUp}>
                <SignUpForm />
            </Modal>

            <Modal isOpen={isLoginOpen} onClose={handleCloseLogin}>
                <LoginForm handleLogin={handleLogin} />
            </Modal>
        </div>
    );
};

// Styles that need to be transfered to their own styles page for the starter page
const pageStyle = {
    textAlign: 'center',
    color: 'white',
    padding: '20px',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const logoStyle = {
    maxWidth: '100%',
    height: 'auto',
    margin: '0 auto',
    display: 'block',
};

const contentContainer = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
    alignItems: 'stretch',
    width: '80%',
};

const infoBoxStyle = {
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    color: '#fff',
    padding: '50px',
    borderRadius: '10px',
    width: '35%',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '600px',
    backdropFilter: 'blur(10px)',
};

const formContainer = {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'rgba(34, 34, 34, 0.5)',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '300px',
    backdropFilter: 'blur(10px)',
    margin: '0 auto',
};

const headerStyle = {
    color: '#1e90ff',
    margin: '20px 0',
};

const infoTextStyle = {
    color: '#ddd',
    marginBottom: '30px',
};

const buttonContainer = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '30px',
};

const loginButtonStyle = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
};

const signUpButtonStyle = {
    backgroundColor: '#FFA500',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
};

const orTextStyle = {
    color: '#1e90ff',
    marginTop: '15px',
    marginBottom: '15px',
    fontSize: '18px',
    fontWeight: 'bold',
};

export default StarterPage;
