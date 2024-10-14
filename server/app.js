const express = require("express");
const app = express();
const path = require('path');
const dataRoute = require("./routes/data"); // API routes
const adminRoute = require("./routes/admin"); // API routes

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, '../dist')));


// API route
app.use('/api/v1/data', dataRoute);
app.use('/admin', adminRoute);
// Serve React's index.html for all other routes (catch-all)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', '../dist', 'index.html'));
});

// Start the server
app.listen(5000, () => console.log("Server is listening on port 5000..."));
