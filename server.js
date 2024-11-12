import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/UserDetails', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, default: '' }, // New field
    dob: { type: Date },  // New field
    genre: { type: String, default: '' } // New field
});

const User = mongoose.model('User', userSchema);

// Signup Endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Validate user input
    if (!username || !email || !password) {
        return res.status(400).send('All fields are required.');
    }

    // Store the password as plain text (insecure)
    const user = new User({ username, email, password });
 
    try {
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (err) {
        console.error('Error during user registration:', err); // Log error for debugging
        if (err.code === 11000) {
            // Duplicate key error (user already exists)
            return res.status(400).send('User already exists');
        }
        res.status(500).send('Error registering user: ' + err.message);
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).send({ message: 'Invalid email or password' });
    }

    // Directly compare the plain-text password
    if (password === user.password) {
        const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
        res.json({ token, username: user.username, email: user.email });
    } else {
        res.status(401).send({ message: 'Invalid email or password' });
    }
});
// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header
    if (!token) return res.status(401).send('Access Denied');

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.status(403).send('Invalid or expired token');
        req.user = user; // Store the decoded user data in the request object
        next();
    });
};

// Profile Update Endpoint
app.put('/update-profile', authenticateJWT, async (req, res) => {
    const { bio, dob, genre } = req.body;
    const userId = req.user.id; // Get the user ID from the JWT token

    // Validate that the required fields are sent
    if (!bio || !dob || !genre) {
        return res.status(400).send('All fields are required.');
    }

    try {
        // Prepare data to update
        const updateData = { bio, dob, genre };

        // Update user profile in the database
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }

        res.send('Profile updated successfully');
    } catch (err) {
        console.error('Error updating profile:', err);
        res.status(500).send('Error updating profile: ' + err.message);
    }
});

// Start the Server
app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});