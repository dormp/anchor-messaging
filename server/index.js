// Express.js backend server for sending/receiving messages and contacts (only for facebook so far)

// Imports
import express from 'express';          
import bodyParser from 'body-parser';   
import axios from 'axios';              
import cors from 'cors';                
import dotenv from 'dotenv';            

// Load environment variables from .env file
dotenv.config();

const app = express();
const VERIFY_TOKEN = process.env.VITE_FACEBOOK_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.VITE_FACEBOOK_PAGE_ACCESS_TOKEN;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global error handling middleware
const errorHandler = (err, req, res, next) => {
    console.error('Unexpected Error:', err);
    res.status(500).json({
        error: 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? err.message : null
    });
};

// In-memory storage only for demo purposes - replace with better storage later
let FACEBOOK_CONTACTS = [];
let MESSAGES = []; 

// Contact Management
app.get('/api/facebook-chats', async (req, res) => {
    try {
        const response = await axios.get(`https://graph.facebook.com/v21.0/me/conversations`, {
            params: {
                access_token: PAGE_ACCESS_TOKEN,
                fields: 'participants{id,name,profile_pic}'
            }
        });

        const chats = response.data.data.map(conversation => {
            const participant = conversation.participants.data[0];
            return {
                id: participant.id,
                name: participant.name,
                type: 'facebook',
                profile_pic: participant.profile_pic || null
            };
        });

        res.json({ chats });
    } catch (error) {
        console.error('Facebook chats fetch error:', error.response?.data || error.message);
        res.status(500).json({
            error: 'Failed to fetch Facebook chats',
            details: error.message
        });
    }
});

// Webhook Verification
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(400);
    }
});

// Webhook Message Handler
app.post('/webhook', (req, res) => {
    const body = req.body;

    if (body.object === 'page') {
        body.entry.forEach(entry => {
            const webhookEvent = entry.messaging[0];
            const senderId = webhookEvent.sender.id;
            const messageText = webhookEvent.message?.text;

            // Store new messages in the in-memory storage
            if (messageText) {
                const newMessage = {
                    id: Date.now().toString(),
                    sender: {
                        id: senderId,
                        name: FACEBOOK_CONTACTS.find(contact => contact.id === senderId)?.name || 'Unknown Sender'
                    },
                    text: messageText,
                    type: 'facebook',
                    timestamp: new Date().toISOString(),
                    read: false
                };

                MESSAGES.push(newMessage);
            }
        });

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// Retrieve Messages
app.get('/api/messages', (req, res) => {
    try {
        // Sort messages by timestamp
        const sortedMessages = MESSAGES.sort((a, b) =>
            new Date(a.timestamp) - new Date(b.timestamp)
        );

        res.json({
            messages: sortedMessages,
            total: MESSAGES.length
        });
    } catch (error) {
        console.error('Messages fetch error:', error);
        res.status(500).json({
            error: 'Failed to retrieve messages',
            details: error.message
        });
    }
});

// Send Messages
const sendMessageToFacebook = async (recipientId, messageText) => {
    const url = `https://graph.facebook.com/v21.0/me/messages`;
   
    const messageData = {
        recipient: { id: recipientId },
        message: { text: messageText },
        access_token: PAGE_ACCESS_TOKEN
    };

    try {
        // Send message with Facebook Graph API
        const response = await axios.post(url, messageData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Facebook Send API error:', error.response?.data || error.message);
        throw error;
    }
};

// Send Message Endpoint
app.post('/api/send-message', async (req, res) => {
    const { contactId, message } = req.body;

    if (!contactId || !message) {
        return res.status(400).json({ 
            error: 'Contact ID and message are required',
            receivedData: req.body
        });
    }

    try {
        // Send message through Facebook API
        await sendMessageToFacebook(contactId, message);

        // Store sent message in local memory
        const newMessage = {
            id: Date.now().toString(),
            sender: {
                id: 'me',
                name: 'Me'
            },
            text: message,
            type: 'facebook',
            timestamp: new Date().toISOString(),
            contactId: contactId
        };

        MESSAGES.push(newMessage);

        res.status(200).json({ success: true, message: newMessage });
    } catch (error) {
        // Log error info
        console.error('Comprehensive Send Message Error:', {
            message: error.message,
            stack: error.stack,
            requestBody: req.body
        });

        res.status(500).json({ 
            error: 'Failed to send message', 
            details: error.message 
        });
    }
});

// Mark Messages as Read
app.post('/api/mark-messages-read', (req, res) => {
    const { contactId } = req.body;

    if (!contactId) {
        return res.status(400).json({ error: 'Contact ID is required' });
    }

    // Update read status for all messages from contact
    MESSAGES = MESSAGES.map(msg => 
        (msg.sender.id === contactId) 
            ? { ...msg, read: true } 
            : msg
    );

    res.json({ success: true, updatedMessages: MESSAGES.length });
});

// Server Startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));