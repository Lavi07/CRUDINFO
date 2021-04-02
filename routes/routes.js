const express = require('express');
const router = express.Router();
const app = express()
const userController = require('../controller/userController');
const roleController = require('../controller/roleController')
const multer = require('multer');
router.use(express.static(__dirname + "./public/"));

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        return cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        return cb(null, + Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage });


//For user SignUp router
router
    .post('/userSignUp', upload.single('image'), userController.userSignUp)

//get all user list    
router
    .get('/getAllUserList', userController.getAllUserList)

//soft user delete    
router
    .put('/deleteUser/:id', upload.single('image'), userController.deleteUser)

// update user data
router
    .put('/updateUser/:id', upload.single('image'), userController.updateUser)

//get all user role    
router
    .get('/getAllRole', roleController.getAllRole)

//get role with user data
router
    .get('/getUserWithRole',userController.getUserWithRole)

module.exports = router, app