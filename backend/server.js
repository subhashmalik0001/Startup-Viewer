const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Multer Setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- ROUTES ---

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, password, and role are required." });
    }

    try {
        // Check if user exists
        const { data: existingUser, error: searchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (existingUser) {
            return res.status(400).json({ message: "User already exists." });
        }

        // Insert new user
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert([{ email, password, role }]) // Note: In production, hash passwords!
            .select()
            .single();

        if (insertError) {
            throw insertError;
        }

        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password) // Note: In production, compare hashed passwords!
            .single();

        if (error || !user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        console.error("Login error:", error);
        if (error.code === 'PGRST116') { // No rows found (JSON object requested, multiple (or no) rows returned)
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get User Profile
app.get('/users/:id', async (req, res) => {
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', req.params.id)
            .single();

        if (error || !user) {
            return res.status(404).json({ message: "User not found" });
        }

        const userWithProfile = {
            ...user,
        };

        res.json(userWithProfile);
    } catch (error) {
        console.error("Fetch user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get All Startups
app.get('/startups', async (req, res) => {
    try {
        const { data: startups, error } = await supabase
            .from('startups')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        res.json(startups);
    } catch (error) {
        console.error("Fetch startups error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Create Startup Endpoint
app.post('/startups', upload.single('video'), async (req, res) => {
    const startupData = req.body;
    const videoFile = req.file;

    // Parse JSON strings back to objects/arrays (FormData sends them as strings)
    let parsedTags = [], parsedHiring = [], parsedTeam = [];
    try {
        if (startupData.tags) parsedTags = JSON.parse(startupData.tags);
        if (startupData.hiring) parsedHiring = JSON.parse(startupData.hiring);
        if (startupData.team) parsedTeam = JSON.parse(startupData.team);
    } catch (e) {
        console.error("JSON parse error", e);
    }

    // Upload Video to Supabase Storage
    let videoUrl = null;
    if (videoFile) {
        try {
            // Generate unique filename
            const fileExt = path.extname(videoFile.originalname) || ".mp4";
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}${fileExt}`;

            // Upload to Supabase 'videos' bucket
            const { data: uploadData, error: uploadError } = await supabase
                .storage
                .from('videos')
                .upload(fileName, videoFile.buffer, {
                    contentType: videoFile.mimetype,
                    upsert: false
                });

            if (uploadError) {
                console.error("Supabase Storage Upload Error:", uploadError);
                throw uploadError;
            }

            // Get Public URL
            const { data: { publicUrl } } = supabase
                .storage
                .from('videos')
                .getPublicUrl(fileName);

            videoUrl = publicUrl;
        } catch (uploadErr) {
            console.error("Failed to upload video:", uploadErr);
            return res.status(500).json({ message: "Failed to upload video file." });
        }
    }

    const newStartup = {
        name: startupData.name,
        oneLiner: startupData.oneLiner,
        description: startupData.description,
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=2070", // Placeholder
        stage: startupData.stage || "idea",
        equity: Number(startupData.equity) || 0,
        fundingAmount: Number(startupData.fundingAmount) || 0,
        tags: parsedTags,
        hiring: parsedHiring,
        team: parsedTeam,
        verified: false,
        isUserCreated: true,
        stats: {
            views: 0,
            swipeRightRatio: 0,
            investorMatches: 0,
            talentApplications: 0
        },
        pitch_video_url: videoUrl
    };

    try {
        const { data, error } = await supabase
            .from('startups')
            .insert([newStartup])
            .select()
            .single();

        if (error) {
            console.error("Supabase Insert Error:", error);
            throw error;
        }

        res.status(201).json(data);
    } catch (error) {
        console.error("Create startup error:", error);
        res.status(500).json({ message: "Failed to save startup to database." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
