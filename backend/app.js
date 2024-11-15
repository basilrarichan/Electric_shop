const express = require('express');
const app = express();
const cors = require('cors');
const port = 3001; // You can choose any port number
const path = require('path')
const fs = require('fs')
const mime = require('mime-types');



// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:3000', //  frontend URL
  methods: ['GET', 'POST'], // Allowed methods
  credentials: true, // Enable to allow cookies to be sent with requests
}));

require('./db.js');//logic for database is write inside the file



app.get('/uploads/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  const filePath = path.join(__dirname, '../upload', imageName);

  // Attempt to determine MIME type based on file extension
  let mimeType = mime.lookup(filePath);

  // If mime.lookup() fails, assume the file is a JPEG image (or another default)
  if (!mimeType) {
    mimeType = 'image/jpeg';  // Default MIME type
  }

  res.setHeader('Content-Type', mimeType);
  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).send('File not found');
    }
  });
});





// Define a route
app.use('/', require('./Routes/Auth'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
