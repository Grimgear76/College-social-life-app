const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = 'collegeSocial';

// Ensure uploads folder exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname + '-' + Date.now() + ext;
    cb(null, name);
  },
});
const upload = multer({ storage });

// GET all posts
router.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const posts = await db
      .collection('posts')
      .find({})
      .sort({ _id: -1 })
      .toArray();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

// POST a new post (optional image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { user, title, content } = req.body;
    if (!user || !content) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const postData = {
      user,
      title: title || null,
      content,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdAt: new Date(),
    };

    await client.connect();
    const db = client.db(dbName);
    await db.collection('posts').insertOne(postData);

    res.json(postData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
