// import user Model
const User = require('../models/userModel')
// IMPORTANT! - USER refers to the user model

// json web token
const jwt = require('jsonwebtoken')

// create a jwt
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login
const logInUser = async (req, res) => {
    const {email, password} = req.body
    // pull out email + password from req.body

    // login user
    try {
        // call our custom login static method from the user model
        const user = await User.login(email, password)

        // if successful, create jwt
        const token = createToken(user._id)

        // return the email and newly logged in jwt
        res.status(200).json({email, token})

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


// signup
const signUpUser = async (req, res) => {
    const {email, password} = req.body

    try {
        // call on the custom signup static method we created in the user model
        const user = await User.signup(email, password)

        // create jwt for the user
        const token = createToken(user._id)
        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
        // res.json({message: 'sign up user'})
}

// export
module.exports = {signUpUser, logInUser}