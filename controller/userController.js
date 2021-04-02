const userModel = require('../model/userModel')
const ObjectId = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')

exports.userSignUp = async (req, res) => {
    try {
        //check email is valid or not
        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!emailRegex.test(req.body.email)) {
            res.send(
                "Invalid Email"
            )
        }
        //check email is already registered or not
        let checkUserEmailExists = await userModel.findOne({ email: req.body.email })
        let checkUserPhoneExists = await userModel.findOne({ phone: req.body.phone })
        let checkUserCodeExists = await userModel.findOne({ code: req.body.code })
        if (checkUserEmailExists) {
            res.json({
                success: "fail",
                message: "User already registered with this email id"
            })
        }
        else if (checkUserPhoneExists) {
            res.json({
                success: "fail",
                message: "User already registered with this Phone"
            })
        }
        else if (checkUserCodeExists) {
            res.json({
                success: "fail",
                message: "User already registered with this Code"
            })
        }
        else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                else {
                    const user = new userModel({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        phone: req.body.phone,
                        code: req.body.code,
                        image: req.file.filename,
                        createdAt: Date.now()
                    })

                    user.save((err, doc) => {
                        if (!err) {
                            res.json({
                                status: "Success",
                                data: doc
                            })
                        }
                        else {
                            res.json({
                                status: "fail",
                                error: err.message
                            })
                        }
                    })
                }
            })
        }

    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }
}

exports.getAllUserList = async (req, res, next) => {
    try {
        let result = await userModel.find({})
        let re = result.map(data => {
            if (data.deletedAt === undefined) {
                return data;
            }
        })
        if (re) {
            res.json({
                status: "Success",
                data: re
            })
        }
    } catch (error) {
        res.json({
            status: "Fail",
            Message: "Error:-" + error
        })
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        //check email is valid or not
        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!emailRegex.test(req.body.email)) {
            res.send(
                "Invalid Email"
            )
        }
        //check valid id
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: "fail",
                message: `No record with this id : ${req.params.id}`
            })
        }

        let checkUserEmailExists = await userModel.findOne({ email: req.body.email })
        let checkUserPhoneExists = await userModel.findOne({ phone: req.body.phone })
        let checkUserCodeExists = await userModel.findOne({ code: req.body.code })
        if (checkUserEmailExists) {
            res.json({
                success: "fail",
                message: "User already registered with this email id"
            })
        }
        else if (checkUserPhoneExists) {
            res.json({
                success: "fail",
                message: "User already registered with this Phone"
            })
        }
        else if (checkUserCodeExists) {
            res.json({
                success: "fail",
                message: "User already registered with this Code"
            })
        }
        else{
         bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            else {
                const user = {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hash,
                    image: req.file.filename,
                    phone: req.body.phone,
                    code: req.body.code,
                    updatedAt: Date.now()
                }
                 userModel.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
                    if (!err) {
                        res.json({
                            status: "Success",
                            data: doc
                        })
                    }
                    else {
                        res.json({
                            status: "fail",
                            message: err.message
                        })
                    }
                })
            }
        })
    }
    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }

}

exports.deleteUser = async (req, res, next) => {
    try {
        //check email is valid or not
        let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!emailRegex.test(req.body.email)) {
            res.send(
                "Invalid Email"
            )
        }

        //check valid id
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                success: "fail",
                message: `No record with this id : ${req.params.id}`
            })
        }
        const user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            image: req.file.filename,
            phone: req.body.phone,
            code: req.body.code,
            deletedAt: Date.now()
        }

        await userModel.findByIdAndUpdate(req.params.id, { $set: user }, { new: true }, (err, doc) => {
            if (!err) {
                res.json({
                    status: "Success",
                    data: doc
                })
            }
            else {
                res.json({
                    status: "fail",
                    message: err.message
                })
            }
        })
    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }
}

exports.getUserWithRole = async (req, res, next) => {
    try {
        let users=await userModel.aggregate([{
            $lookup:{
                from:'roles',
                localField:'_id',
                foreignField:'userId',
                as:'userRoleData'
            }
        }])
        res.json({
            status:"Success",
            result:users
        })
    } catch (error) {
        res.json({
            status: "fail",
            message: error.message
        })
    }
}

