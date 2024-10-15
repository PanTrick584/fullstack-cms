require("dotenv").config();

const express = require("express");
const cors = require('cors');

const app = express();

const path = require('path');
const dataRoute = require("./routes/data"); // API routes
const adminRoute = require("./routes/admin"); // API routes

const connectDB = require("./db/connect");

// Middleware to parse JSON
app.use(cors());
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

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
}
// Start the server
start()