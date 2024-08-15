const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');

const User = require('./models/User');
const Announcement = require('./models/Announcement');
const Event = require('./models/Event'); // Import the Event model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/your-database-name';
const SPECIAL_KEY = process.env.SPECIAL_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Set up Multer for image uploads
const storage = multer.memoryStorage(); // Store images in memory
const upload = multer({ storage });

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User-related endpoints

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { username, password, passphrase } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    if (passphrase !== SPECIAL_KEY) {
      return res.status(400).json({ error: 'Incorrect passphrase' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Change password endpoint
app.post('/api/change-password', async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isValidOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidOldPassword) {
      return res.status(401).json({ error: 'Invalid old password' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete account endpoint
app.delete('/api/delete-account', async (req, res) => {
  const { username } = req.body;

  try {
    const result = await User.findOneAndDelete({ username });
    if (!result) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Account deletion error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify user endpoint
app.get('/api/verify-user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User exists' });
  } catch (error) {
    console.error('User verification error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Announcement-related endpoints

// POST route to add a new announcement
app.post('/api/announcements', async (req, res) => {
  const { title, details } = req.body;

  const newAnnouncement = new Announcement({
    announcementTitle: title,
    announcementDetails: details,
    createdAt: new Date(), // Automatically set to current date and time
  });

  try {
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    console.error('Error saving announcement:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET route to fetch all announcements
app.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE route to delete an announcement
app.delete('/api/announcements/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Announcement.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Announcement not found' });
    }
    res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    console.error('Error deleting announcement:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Event-related endpoints

// POST route to add a new event with image upload
app.post('/api/events', upload.single('image'), async (req, res) => {
  const { title, details, registrationLink } = req.body;
  const image = req.file ? req.file.buffer : null; // Get the uploaded image from Multer

  const newEvent = new Event({
    eventName: title,
    eventDescription: details,
    eventImage: image, // Store image buffer directly
    eventRegistrationLink: registrationLink,
    createdAt: new Date(),
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET route to fetch all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET route to fetch an event image
app.get('/api/events/image/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);
    if (!event || !event.eventImage) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.set('Content-Type', 'image/jpeg'); // Set the appropriate content type
    res.send(event.eventImage);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE route to delete an event
app.delete('/api/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Event.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
