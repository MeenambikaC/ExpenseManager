const mongoose=require('mongoose')

const sendReminderEmail = require('../controller/sendEmail')

const ReminderSchema =new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        max_length:50
    },
    amount:{
        type:Number,
        required:true,
        trim:true,
        max_length:20
    },
    type:{
        type:String,
        default:"reminder",
    },
    date:{
        type:Date,
        required:true,
        trim:true,
    },
    category:{
        type:String,
        required:true,
        trim:true,
    },
    email: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true,
        trim:true,
        max_length:20
    },

}, {timestamps:true})


module.exports=mongoose.model('Reminder', ReminderSchema)