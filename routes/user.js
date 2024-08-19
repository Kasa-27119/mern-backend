const express = require('express')
const router = express.Router()

// controller functions
const {signUpUser, logInUser} = require('../controllers/userController')
// set up login and signup routes

// login route
router.post('/login', logInUser)

// sign up route
router.post('/signup', signUpUser)





module.exports = router