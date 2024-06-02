const mongoose=require('mongoose')

const loginSchema =new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        max_length:50
    },
    password:{
        type:String,
        required:true,
        trim:true,
        max_length:50
    },
    type:{
        type:String,
        default:"login",
    },

}, {timestamps:true})

module.exports=mongoose.model('Login', loginSchema)