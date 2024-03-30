const users = [];
const { sign, verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const { v4 } = require('uuid'); 

// Check if username and password match
async function register(username, password, res) {
    try {
        const hashedPassword = await hash(password, 10);
        const user = { uid: v4(), username: username, password: hashedPassword };
        users.push(user);
        res.status(201);
        res.redirect('/login');
    } catch {
        res.status(500).send();
    }
}

// Check if username and password match
async function login(username, password, res) {
    const user = users.find(user => user.username === username);
    if (user == null) {
        return res.status(400).send('User not found');
    }

    try {
        if (await compare(password, user.password)) {
            const token = sign({ username: user.username }, 'secret');
            res.redirect('/protected');
        } else {
            res.status(401).send('Password incorrect');
        }
    } catch {
        res.status(500).send();
    }
}

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    verify(token, 'secret', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

module.exports = { login, authenticateToken, register };