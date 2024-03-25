const express = require('express');
const router = express.Router();
const path = require('path');
import { login, authenticateToken } from 'auth_helper.js';

// Homepage
router.get('/', (req, res) => {
    res.send('Welcome to the homepage');
});

// Login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

router.post('/login', async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;
    await login(username, password);
});

router.get('/about', (req, res) => {
    res.send('About page');
});

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.send('Protected route');
});

module.exports = router;