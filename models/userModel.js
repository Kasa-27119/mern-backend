const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema
const userSchema = new Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})  

// static signup method

// validate and encrypt email and password
userSchema.statics.signup = async function (email, password) {
    // check if existing email and passowrd
    if (!email || !password) {
        throw Error('all fields must be filled in')
    }

    // check if email is valid
    if(!validator.isEmail(email)) {
        throw Error('email is not valid')
    }

    // check if password is strong enough
    // default - validator will expect it to have:
    // min. 8 chars, min. 1 lowercase, min 1 number, min 1 symbol

    if(!validator.isStrongPassword(password)) {
        throw Error('password is not strong enough')
    }

    const exists = await this.findOne({email})

    // checks if email in use
    if (exists) {
        throw Error('Email is already in use')
    }
    // normal password: mypassword
    // add Salt: mypassword1d323bida9 (add salt to the end)
    // Hash: 64j3bjob3n90fbsiwobw...(64 characters)

    // 1. generate salt w/ 10 chars.
    const salt = await bcrypt.genSalt(10)

    // 2. hash password and salt combined
    const hash = await bcrypt.hash(password, salt)

    // 3. set the password to the hash value when creating the user
    const user = await this.create({email, password: hash})

    // 4. return user
    return user
}

// static login method
userSchema.statics.login = async function (email, password) {
    // check if their is email + password values
    if (!email || !password) {
        throw Error('all fields must be filled in')
    }

    // try find user in the db w the email
    const user = await this.findOne({email})

    // throw error if no user found
    if (!user) {
        throw Error('incorrect email')
    }

    // compare passwords
    const match = await bcrypt.compare(password, user.password) // return true or false

    // throw error if they don't match
    if (!match) {
        throw Error('incorrect password')
    }

    // if it does match
    return user
}

module.exports = mongoose.model('User', userSchema)