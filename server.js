//Check if the app is in the Development or Production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()

// Connection
const connection = require('./connection')

// Import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

// Middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))


// Routes Middleware
app.use('/api/user', authRoute)
app.use('/api/post', postRoute)

port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server up and running on port ' + port))