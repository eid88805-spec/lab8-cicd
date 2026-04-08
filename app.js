const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

// Uses the DB service name 'mongo' passed via environment variable
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUrl);

app.get('/tasks', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('taskdb');
    const tasks = await db.collection('tasks').find({}).toArray();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Database connection error");
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});