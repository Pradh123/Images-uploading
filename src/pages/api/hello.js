// api/hello.js

import express from 'express';
import http from 'http'
const app = express();

// Middleware to handle JSON payloads
app.use(express.json());

// Sample GET route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express on Vercel!' });
});

// Sample POST route
app.post('/api/data', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hello, ${name}!` });
});

// Export the Express app as a serverless function
const servermodule= (req, res) => {
  const server = http.createServer(app);
  server.emit('request', req, res);
};

export default servermodule
