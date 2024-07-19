const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const fs = require('fs');
const path = require('path');
const cron = require('node-cron');
const { sendRemindersForToday } = require('./controller/reminder'); 
// import { cron } from './api/cron'
require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
// app.use('/cron', cron);
// Accessing the home page
app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.get('/api/v1/cron', async (req, res) => {
    try {
        await sendRemindersForToday();
        res.status(200).send('Cron job executed successfully.');
    } catch (error) {
        res.status(500).send('Error executing cron job.');
        console.error('Error executing cron job:', error);
    }
});

// Dynamically load routes from files inside the routes directory
const routesDir = path.join(__dirname, 'routes');
fs.readdir(routesDir, (err, files) => {
    if (err) {
        console.error('Error loading routes:', err);
        return;
    }
    files.forEach((file) => {
        const routePath = path.join(routesDir, file);
        const routeHandler = require(routePath);
        app.use('/api/v1', routeHandler);
    });
});

// Function to start the server and initialize database connection
const startServer = () => {
    db();
    app.listen(PORT, () => {
        console.log('Server is listening on port:', PORT);
    });
    // Cron job to send reminder emails every day at 00:15 and 06:15
    // cron.schedule('25 14,15 * * *', async () =>{
    // cron.schedule('*/3 * * * *', async () => {
    // // cron.schedule('53 0,6 * * *', async () => {
    //     try {
    //         // Call the function directly
    //         await sendRemindersForToday({}, {}); // Pass empty request and response objects
    //         // console.log('Reminder emails sent successfully for today');
    //     } catch (error) {
    //         console.error('Error sending reminder emails1:', error);
    //     }
    // });

};

// Start the server
startServer();
