const express = require('express');
const app = express();

const users = [];

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    if (users.some(user => user.username === username)) {
        return res.status(409).send('Username already exists');
    }
    users.push({ username, password });
    res.status(201).send('User registered successfully');
    console.log(`User registered: ${username}`);
})

app.get('/users', (req, res) => {
    if (users.length === 0) {
        return res.status(404).send('No users found');
    }
    res.status(200).json(users.map(user => user.username));
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});