if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


//Model
const User = require('../models/User')

// Validation middleware
const { registerValidation, loginValidation } = require('../validation')

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

router.post('/login', async(req, res) => {
    try {
        //Checking if there is any validation error
        const { error } = loginValidation(req.body)
        if (error)
            return res.status(400).json({
                message: error.details[0].message
            })


        //Checking if the user exists with the provided email
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(400).json({
                message: "Email or password is incorrect"
            });

        //If the provided password is valid
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword)
            return res.status(400).json({
                message: "Email or password is incorrect"
            });

        // Create and assign a token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)

    } catch (error) {

    }
})

module.exports = router