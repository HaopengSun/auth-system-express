import { users } from '/fake_db/user.js';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Check if username and password match
export async function login(username, password) {
    const user = users.find(user => user.username === username);
    if (user == null) {
        return res.status(400).send('User not found');
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username: user.username }, 'secret');
            res.json({ token });
        } else {
            res.status(401).send('Password incorrect');
        }
    } catch {
        res.status(500).send();
    }
}

// Middleware to authenticate JWT token
export function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }
    jwt.verify(token, 'secret', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}
