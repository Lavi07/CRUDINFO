const mongoose = require('mongoose')
const validator=require('mongoose-validator')

//User Schema
const userSchema = new mongoose.Schema({
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    phone:{
        type: String,
        minlength: 10,
        maxlength:10
    },
    code: {
        type: String,
        minlength: 6,
        maxlength:6
    },
    image:String,
    createdAt:Date,
    updatedAt:Date,
    deletedAt:Date
})
module.exports = mongoose.model('user', userSchema)