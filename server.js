const express = require('express');
const cors = require('cors');
const keyRoutes = require('./routes/keyRoutes');
const mailRoutes = require('./routes/mailRoutes');

const app = express();
const PORT = 4000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Updated security headers middleware
app.use((req, res, next) => {
    // Allow dev tools connection and remove restrictive CSP
    res.removeHeader('Content-Security-Policy');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// Root route must come before API routes
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'QuMail API is running',
        endpoints: {
            keys: '/api/keys',
            mails: '/api/mails'
        }
    });
});

// API routes
app.use('/api/keys', keyRoutes);
app.use('/api/mails', mailRoutes);

// Handle 404 - Replace '*' with proper catch-all route
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: `Route ${req.originalUrl} not found`
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

module.exports = app;  // Add this line for testing
