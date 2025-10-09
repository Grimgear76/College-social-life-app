const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; // Make sure this is set in .env
const client = new MongoClient(uri);
const dbName = 'collegeSocial';

router.get('/', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);
    const posts = await db.collection('posts').find({}).sort({ _id: -1 }).toArray();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

router.post('/', async (req, res) => {
  try {
    const { user, content } = req.body;
    if (!user || !content) return res.status(400).json({ error: 'Missing fields' });

    await client.connect();
    const db = client.db(dbName);
    const createdAt = new Date();
    await db.collection('posts').insertOne({ user, content, createdAt });

    res.json({ user, content, createdAt }); // Return the saved post
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
});

module.exports = router;
