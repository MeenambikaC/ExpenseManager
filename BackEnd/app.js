const express =require('express')
const cors= require('cors')
const { db } = require('./db/db')
const {readdirSync}=require('fs')
const app =express()
const fs = require('fs');
const path = require('path');
require ('dotenv').config()
const PORT=process.env.PORT

app.use(express.json())
app.use(cors())

// accessing the home page
app.get('/', (req,res)=>{
    res.send("Hello World!")
})
// read files inside routes folder
// readdirSync('.\\routes').map((route)=>app.use('/api/v1', require('./routes/'+ route)))
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
const server =()=>{
    db()
    app.listen(PORT,()=>{
        console.log('You are listening to port:', PORT )
    })
    
}

server()