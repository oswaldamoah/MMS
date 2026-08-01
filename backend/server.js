const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('./prismaClient');
const memberRoutes = require('./routes/members');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'mms-jwt-secret-change-in-production';
const SPECIAL_KEY = process.env.SPECIAL_KEY || 'ffim-admin-key';

// Middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '5mb' }));

// Multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Image cache (in-memory for event images)
const imageCache = new Map();

const fetchAndCacheImages = async () => {
  try {
    const events = await prisma.event.findMany({
      where: { image: { not: null } },
      select: { id: true, image: true }
    });
    events.forEach(event => {
      if (event.image) {
        imageCache.set(event.id, event.image);
      }
    });
    console.log('Images cached (' + events.length + ' events)');
  } catch (error) {
    console.error('Error caching images:', error.message);
  }
};

// Only attempt cache if DB is reachable
setTimeout(fetchAndCacheImages, 2000);
setInterval(fetchAndCacheImages, 60 * 60 * 1000);

// JWT helpers
function signToken({ username, role }) {
  return jwt.sign({ sub: username, role }, JWT_SECRET, { expiresIn: '7d' });
}

function authMiddleware(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing Authorization header' });
    }
    const token = header.slice('Bearer '.length);
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.user = { username: payload.sub, role: payload.role };
      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      return next();
    } catch {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
  };
}

// Health
app.get('/api/health', (_req, res) => res.json({ ok: true, status: 'running' }));

// ==================== AUTH ====================

app.post('/api/signup', async (req, res) => {
  const { username, password, passphrase, role } = req.body;
  try {
    if (!username || !password) return res.status(400).json({ error: 'Username and password required' });
    if (passphrase !== SPECIAL_KEY) return res.status(400).json({ error: 'Incorrect passphrase' });

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) return res.status(400).json({ error: 'Username already exists' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        passwordHash,
        role: role === 'admin' ? 'admin' : 'member',
      }
    });

    await prisma.adminLog.create({
      data: { username, activity: 'created account' }
    }).catch(() => {});

    return res.status(201).json({ message: 'Signup successful', username, role: newUser.role });
  } catch (e) {
    console.error('Signup error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return res.status(401).json({ error: 'Invalid password' });

    const token = signToken({ username: user.username, role: user.role });

    await prisma.adminLog.create({
      data: { username: user.username, activity: 'logged in' }
    }).catch(() => {});

    return res.status(200).json({ message: 'Login successful', token, role: user.role, username: user.username });
  } catch (e) {
    console.error('Login error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/me', authMiddleware(), (req, res) => {
  return res.status(200).json({ user: req.user });
});

app.post('/api/change-password', authMiddleware(), async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { username: req.user.username } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const ok = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid old password' });

    const newHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { username: req.user.username },
      data: { passwordHash: newHash }
    });
    return res.status(200).json({ message: 'Password changed successfully' });
  } catch (e) {
    console.error('Password change error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/delete-account', authMiddleware(), async (req, res) => {
  try {
    await prisma.user.delete({ where: { username: req.user.username } });
    return res.status(200).json({ message: 'Account deleted successfully' });
  } catch (e) {
    console.error('Account deletion error:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ==================== ANNOUNCEMENTS ====================

app.get('/api/announcements', async (_req, res) => {
  try {
    const items = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(items);
  } catch (e) {
    console.error('Error fetching announcements:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/announcements', authMiddleware('admin'), async (req, res) => {
  const { title, details } = req.body;
  try {
    const created = await prisma.announcement.create({
      data: { title, details }
    });
    return res.status(201).json(created);
  } catch (e) {
    console.error('Error saving announcement:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/announcements/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await prisma.announcement.delete({ where: { id: req.params.id } });
    return res.status(200).json({ message: 'Announcement deleted successfully' });
  } catch (e) {
    console.error('Error deleting announcement:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ==================== EVENTS ====================

app.get('/api/events', async (_req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(events);
  } catch (e) {
    console.error('Error fetching events:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/events/image/:id', async (req, res) => {
  try {
    if (imageCache.has(req.params.id)) {
      res.set('Content-Type', 'image/jpeg');
      return res.send(imageCache.get(req.params.id));
    }
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      select: { id: true, image: true }
    });
    if (!event || !event.image) return res.status(404).json({ error: 'Image not found' });
    imageCache.set(req.params.id, event.image);
    res.set('Content-Type', 'image/jpeg');
    return res.send(event.image);
  } catch (e) {
    console.error('Error fetching image:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Public event by slug (for URL sharing)
app.get('/api/public/events/:slug', async (req, res) => {
  try {
    const ev = await prisma.event.findUnique({
      where: { slug: req.params.slug }
    });
    if (!ev) return res.status(404).json({ error: 'Event not found' });
    return res.status(200).json({
      _id: ev.id,
      slug: ev.slug,
      eventName: ev.title,
      eventDescription: ev.description,
      eventRegistrationLink: ev.registrationLink,
      imageUrl: '/api/events/image/' + ev.id,
      createdAt: ev.createdAt,
    });
  } catch (e) {
    console.error('Error fetching public event:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/events', authMiddleware('admin'), upload.single('image'), async (req, res) => {
  const { title, details, registrationLink, slug } = req.body;
  const image = req.file ? req.file.buffer : null;

  try {
    const generatedSlug = slug || String(title || '').toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '') + '-' + Date.now();
    if (!generatedSlug) return res.status(400).json({ error: 'Slug or title required' });

    const newEvent = await prisma.event.create({
      data: {
        title: title || '',
        description: details || '',
        image: image || undefined,
        registrationLink: registrationLink || null,
        slug: generatedSlug,
      }
    });
    if (image) imageCache.set(newEvent.id, image);
    return res.status(201).json(newEvent);
  } catch (e) {
    console.error('Error saving event:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/events/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } });
    imageCache.delete(req.params.id);
    return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (e) {
    console.error('Error deleting event:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ==================== PAYMENT INFO ====================

app.get('/api/payment-info', async (_req, res) => {
  try {
    const items = await prisma.paymentInfo.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json(items);
  } catch (e) {
    console.error('Error fetching payment info:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/payment-info', authMiddleware('admin'), async (req, res) => {
  const { paymentOption, paymentDetails } = req.body;
  try {
    const created = await prisma.paymentInfo.create({
      data: { paymentOption, paymentDetails }
    });
    return res.status(201).json(created);
  } catch (e) {
    console.error('Error saving payment info:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/payment-info/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await prisma.paymentInfo.delete({ where: { id: req.params.id } });
    return res.status(200).json({ message: 'Payment info deleted successfully' });
  } catch (e) {
    console.error('Error deleting payment info:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

// ==================== MEMBERS ====================

app.get('/api/members', async (_req, res) => {
  try {
    const members = await prisma.member.findMany();
    return res.status(200).json(members);
  } catch (e) {
    console.error('Error fetching members:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/members', authMiddleware('admin'), async (req, res) => {
  const { name, contact, dateJoined } = req.body;
  if (!name || !contact || !dateJoined) return res.status(400).json({ error: 'All fields are required' });
  try {
    const created = await prisma.member.create({
      data: { name, contact, dateJoined }
    });
    return res.status(201).json({ message: 'Member added successfully', member: created });
  } catch (e) {
    console.error('Error adding member:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/members/:id', authMiddleware('admin'), async (req, res) => {
  const { name, contact, dateJoined } = req.body;
  if (!name || !contact || !dateJoined) return res.status(400).json({ error: 'All fields are required' });
  try {
    const updated = await prisma.member.update({
      where: { id: req.params.id },
      data: { name, contact, dateJoined }
    });
    return res.status(200).json({ message: 'Member updated successfully', member: updated });
  } catch (e) {
    console.error('Error updating member:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/members/:id', authMiddleware('admin'), async (req, res) => {
  try {
    await prisma.member.delete({ where: { id: req.params.id } });
    return res.status(200).json({ message: 'Member deleted successfully' });
  } catch (e) {
    console.error('Error deleting member:', e);
    return res.status(500).json({ error: 'Server error' });
  }
});

app.use('/api/members', memberRoutes);

// Start server
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT + ' (Prisma/Postgres)');
});
