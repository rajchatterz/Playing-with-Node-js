const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Connection URI for MongoDB (change this accordingly)
const mongoURI = 'mongodb://localhost:27017'; // Default MongoDB URI

// Database and Collection names
const dbName = 'myDatabase';
const collectionName = 'users';

// In-memory storage for user data (optional for temporary storage)
let userData = {};

// Connect to MongoDB
MongoClient.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Route to handle login data from React Native
    app.post('/login', async (req, res) => {
      const { username, password } = req.body;

      // Create a document to be inserted
      const userDocument = { username, password };

      // Insert the user data into the MongoDB collection
      try {
        await collection.insertOne(userDocument);
        userData = userDocument; // Optional for temporary storage
        res.json({ message: 'Login data received and stored.' });
      } catch (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ message: 'Error storing data.' });
      }
    });

    // Route to retrieve stored user data
    app.get('/user', async (req, res) => {
      try {
        const user = await collection.findOne();
        if (!user) {
          return res.status(404).json({ message: 'User data not found.' });
        }
        userData = user; // Optional for temporary storage
        res.json(user);
      } catch (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ message: 'Error retrieving data.' });
      }
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
