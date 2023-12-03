// Import required modules
const express = require('express');
const path = require('path');

// Create an Express application
const app = express();

app.use(express.static(__dirname));
// Define a route for the root URL
app.get('/', (req, res) => {
  // Send the HTML file as the response
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});