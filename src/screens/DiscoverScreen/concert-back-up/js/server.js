const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const admin = require('firebase-admin');

// Load environment variables from .env file
dotenv.config();

// Initialize Firebase Admin with credentials from the environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  }),
  databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
});

// Serve static files from the 'public' directory (you might need to adjust this path)
app.use(express.static(path.join(__dirname, 'public')));

// Serve your HTML file
app.get('/room', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/screens/DiscoverScreen/room3.html'));
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
