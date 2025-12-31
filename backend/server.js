const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const DB_FILE = path.join(__dirname, 'users.json');
const STARTUPS_FILE = path.join(__dirname, 'startups.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read data
const readData = (filePath) => {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath);
    try {
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};

// Helper to save data
const saveData = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const getUsers = () => readData(DB_FILE);
const saveUsers = (users) => saveData(DB_FILE, users);

const getStartups = () => readData(STARTUPS_FILE);
const saveStartups = (startups) => saveData(STARTUPS_FILE, startups);

app.post('/signup', (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const users = getUsers();
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = { id: Date.now().toString(), email, password, role };
    users.push(newUser);
    saveUsers(users);

    console.log(`User registered: ${email}`);
    res.status(201).json({ message: 'User created successfully', user: { id: newUser.id, email: newUser.email, role: newUser.role } });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    console.log(`User logged in: ${email}`);
    res.json({ user: { id: user.id, email: user.email, role: user.role } });
});

// User Profile API
app.get('/users/:id/profile', (req, res) => {
    const { id } = req.params;
    const users = getUsers();
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Return profile or defaults if not set
    const defaultProfile = {
        title: "New Member",
        location: "Unknown",
        bio: "No bio yet.",
        skills: [],
        timezone: "UTC",
        availability: "Open to Connect"
    };

    res.json(user.profile || defaultProfile);
});

app.put('/users/:id/profile', (req, res) => {
    const { id } = req.params;
    const profileData = req.body;

    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users[userIndex].profile = { ...users[userIndex].profile, ...profileData };
    saveUsers(users);

    console.log(`Updated profile for user ${id}`);
    res.json(users[userIndex].profile);
});

// Startups API
app.get('/startups', (req, res) => {
    const startups = getStartups();
    res.json(startups);
});

app.post('/startups', (req, res) => {
    const startupData = req.body;

    // Basic validation
    if (!startupData.name || !startupData.description) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const startups = getStartups();
    // Generate a simple ID if not provided (though frontend usually doesn't provide it for creation)
    const newStartup = {
        ...startupData,
        id: startupData.id || Date.now().toString(),
        createdAt: new Date().toISOString()
    };

    startups.push(newStartup);
    saveStartups(startups);

    console.log(`Startup created: ${newStartup.name}`);
    res.status(201).json(newStartup);
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
