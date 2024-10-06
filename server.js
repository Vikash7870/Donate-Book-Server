import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';  // Import path module
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/books.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI; // Ensure this variable is set in your .env file

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/books', bookRoutes); // Book-related routes

// Serve static files from the React frontend app
app.use(express.static(path.join(path.resolve(), 'build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve(), 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
