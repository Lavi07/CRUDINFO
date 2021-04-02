const mongoose = require('mongoose')

//Role Schema
const roleSchema = new mongoose.Schema({
    name: String,
    createdAt:Date,
    updatedAt:Date,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})
const roleModel = mongoose.model('role', roleSchema)


async function dummyRoleData(){
    let result = await roleModel.findOne({})
    if(!result){
        console.log("Insert Data");
    await roleModel.insertMany([{
        name:"Jr Developer",
        createdAt:Date.now(),
        userId:"6066d6e5a537521a14ab1afe"
    },
    {
        name:"Sr Developer",
        createdAt:Date.now(),
        userId:"6066d710a537521a14ab1aff"
    },
    {
        name:"Project Manager",
        createdAt:Date.now(),
        userId:"6066d739a537521a14ab1b00"
    },
    {
        name:"Teacher",
        createdAt:Date.now(),
        userId:"6066d75ea537521a14ab1b01"
    },
    {
        name:"CEO",
        createdAt:Date.now(),
        userId:"6066d780a537521a14ab1b02"
    },

])
    }
}

dummyRoleData()

module.exports= roleModel