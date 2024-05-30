const express =require('express')
const cors= require('cors')
const { db } = require('./db/db')
const {readdirSync}=require('fs')
const app =express()

require ('dotenv').config()
const PORT=process.env.PORT

app.use(express.json())
app.use(cors())

// accessing the home page
app.get('/', (req,res)=>{
    res.send("Hello World!")
})
// read files inside routes folder
readdirSync('.\routes').map((route)=>app.use('/api/v1', require('./routes/'+ route)))
const server =()=>{
    db()
    app.listen(PORT,()=>{
        console.log('You are listening to port:', PORT )
    })
    
}

server()