const express = require('express');
const router = express.Router();
const path = require('path');
const { login, authenticateToken, register } = require('./fake_db/auth_helper');

// Homepage
router.get('/', (req, res) => {
    res.send('Welcome to the homepage');
});

// Register
router.get('/register', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    await register(username, password, res);
});

// Login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    await login(username, password, res);
});

router.get('/about', (req, res) => {
    res.send('About page');
});

// Protected route
router.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Protected route', user: req.user });
});

module.exports = router;