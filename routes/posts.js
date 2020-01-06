const express = require('express');
const router = express.Router();

//Import jwt middleware
const verifyUser = require('./verifyToken')



router.get('/', verifyUser, (req, res) => {
    res.status(200).json({
        posts: {
            title: 'The first post',
            description: 'Here is the description.'
        }
    })
});

module.exports = router