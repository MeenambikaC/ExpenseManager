const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Accessing the home page
app.get('/', (req, res) => {
    res.send("Hello World!");
});

// Dynamically load routes from files inside the routes directory
try {
    const routeFiles = readdirSync('./routes');
    routeFiles.forEach((route) => {
        const routePath = '/api/v1';
        const routeHandler = require(`./routes/${route}`);
        app.use(routePath, routeHandler);
    });
} catch (error) {
    console.error('Error loading routes:', error);
}

// Establish database connection
const connectDB = async () => {
    try {
        await db(); // Assuming db() returns a Promise
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1); // Terminate the application if database connection fails
    }
};

// Start the server
const startServer = () => {
    connectDB();
    app.listen(PORT, () => {
        console.log('Server is listening on port:', PORT);
    });
};

startServer();
