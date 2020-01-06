if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function verifyUser(req, res, next) {
    const token = req.header('auth-token');

    if (!token) return res.status(401).json({
        message: 'Access denied'
    })

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified;
        next()

    } catch (error) {
        res.status(401).json({
            message: error
        })
    }
}