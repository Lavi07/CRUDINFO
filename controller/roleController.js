const roleModel=require('../model/roleModel')

exports.getAllRole=async (req,res,next)=>{
    try {
        let result=await roleModel.find({})
        res.json({
            status:"Success",
            data:result
        })
    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }
}