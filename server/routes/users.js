const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://devKashifK:Reactislove9852@cluster0.bx3sext.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

router.get('/login', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('db');
    const collection = db.collection('users');
    const { email, password } = req.query;

    const user = await collection.findOne({ email, password });
    if (user) {
      res.status(200).json({ success: true, message: 'Login successful' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  } finally {
    await client.close();
  }
});

console.log("xzzz")
module.exports = router;