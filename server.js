require('dotenv').config()
const express=require("express");
const app=express()
const bodyParser=require('body-parser');
const mongoose=require('./db/db');
const router=require('./routes/routes')

app.use(bodyParser.json())

app.use('/',router)

app.listen(process.env.PORT,()=>{
    console.log(`Server started on port ${process.env.PORT}`);
})