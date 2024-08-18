const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const Member = require('./models/Member');
const User = require('./models/User');
const Announcement = require('./models/Announcement');
const Event = require('./models/Event');
const PaymentInfo = require('./models/PaymentInfo'); // Model for payment options
const memberRoutes = require('./routes/members');
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

// Image caching
const imageCache = new Map();

const fetchAndCacheImages = async () => {
  try {
    const events = await Event.find();
    events.forEach(event => {
      if (event.eventImage) {
        imageCache.set(event._id.toString(), event.eventImage);
      }
    });
    console.log('Images have been cached');
  } catch (error) {
    console.error('Error caching images:', error);
  }
};

// Call this function when the server starts
fetchAndCacheImages();

// Refresh cache periodically
const cacheRefreshInterval = 60 * 60 * 1000; // 1 hour
setInterval(() => {
  console.log('Refreshing image cache...');
  fetchAndCacheImages();
}, cacheRefreshInterval);

// User-related endpoints
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
app.post('/api/announcements', async (req, res) => {
  const { title, details } = req.body;

  const newAnnouncement = new Announcement({
    announcementTitle: title,
    announcementDetails: details,
    createdAt: new Date(),
  });

  try {
    const savedAnnouncement = await newAnnouncement.save();
    res.status(201).json(savedAnnouncement);
  } catch (error) {
    console.error('Error saving announcement:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error fetching announcements:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

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
app.post('/api/events', upload.single('image'), async (req, res) => {
  const { title, details, registrationLink } = req.body;
  const image = req.file ? req.file.buffer : null;

  const newEvent = new Event({
    eventName: title,
    eventDescription: details,
    eventImage: image,
    eventRegistrationLink: registrationLink,
    createdAt: new Date(),
  });

  try {
    const savedEvent = await newEvent.save();
    // Update the cache
    imageCache.set(savedEvent._id.toString(), image);
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/events/image/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check the cache first
    if (imageCache.has(id)) {
      res.set('Content-Type', 'image/jpeg');
      return res.send(imageCache.get(id));
    }

    // Fallback to database if not in cache
    const event = await Event.findById(id);
    if (!event || !event.eventImage) {
      return res.status(404).json({ error: 'Image not found' });
    }

    // Cache the image before sending
    imageCache.set(id, event.eventImage);
    res.set('Content-Type', 'image/jpeg');
    res.send(event.eventImage);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Event.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Event not found' });
    }
    // Remove from cache
    imageCache.delete(id);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PaymentInfo-related endpoints
app.post('/api/payment-info', async (req, res) => {
  const { paymentOption, paymentDetails } = req.body;

  const newPaymentInfo = new PaymentInfo({
    paymentOption,
    paymentDetails,
    createdAt: new Date(),
  });

  try {
    const savedPaymentInfo = await newPaymentInfo.save();
    res.status(201).json(savedPaymentInfo);
  } catch (error) {
    console.error('Error saving payment info:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/payment-info', async (req, res) => {
  try {
    const paymentInfo = await PaymentInfo.find();
    res.status(200).json(paymentInfo);
  } catch (error) {
    console.error('Error fetching payment info:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/payment-info/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await PaymentInfo.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ error: 'Payment info not found' });
    }
    res.status(200).json({ message: 'Payment info deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment info:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/// Member Routes
app.get('/api/members', async (req, res) => {
  try {
    console.log('Fetching members from database');
    const members = await Member.find();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});


app.post('/api/members', async (req, res) => {
  const { name, contact, dateJoined } = req.body;

  if (!name || !contact || !dateJoined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newMember = new Member({ name, contact, dateJoined });
    await newMember.save();
    console.log('New member added:', newMember); // Log the added member
    res.status(201).json({ message: 'Member added successfully', member: newMember });
  } catch (error) {
    console.error('Error adding member:', error);
    res.status(500).json({ error: error.message || 'Server error. Please try again later.' });
  }
});

app.put('/api/members/:id', async (req, res) => {
  const { id } = req.params;
  const { name, contact, dateJoined } = req.body;

  if (!name || !contact || !dateJoined) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const updatedMember = await Member.findByIdAndUpdate(
      id,
      { name, contact, dateJoined },
      { new: true }
    );

    if (!updatedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    console.log('Member updated:', updatedMember); // Log the updated member
    res.status(200).json({ message: 'Member updated successfully', member: updatedMember });
  } catch (error) {
    console.error('Error updating member:', error);
    res.status(500).json({ error: error.message || 'Server error. Please try again later.' });
  }
});

app.delete('/api/members/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMember = await Member.findByIdAndDelete(id);

    if (!deletedMember) {
      return res.status(404).json({ error: 'Member not found' });
    }

    console.log('Member deleted:', deletedMember); // Log the deleted member
    res.status(200).json({ message: 'Member deleted successfully' });
  } catch (error) {
    console.error('Error deleting member:', error);
    res.status(500).json({ error: error.message || 'Server error. Please try again later.' });
  }
});
app.use('/api/members', memberRoutes);