const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')


//Model
const User = require('../models/User')

// Validation middleware
const { registerValidation } = require('../validation')

router.post('/register', async(req, res) => {

    //Checking if there is any validation error
    const { error } = registerValidation(req.body)
    if (error)
        return res.status(400).json({
            message: error.details[0].message
        })


    //Checking if the user already exists with the provided email

    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist)
        return res.status(400).json({
            message: "Email already exists"
        });

    // Hashing the password with bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    }

    const user = new User(newUser)

    try {
        const savedUser = await user.save()

        res.status(201).json({
            message: 'User created successfully.',
            userId: savedUser._id
        })
    } catch (error) {
        res.status(400).json({
            message: 'Error! creating user.',
            error: error
        })
    }
})

router.post('/login', (req, res) => {
    res.send('Login')
})

module.exports = router