//Check if the app is in the Development or Production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()

//Connection
const connection = require('./connection')

//Routes
const authRoute = require('./routes/auth')

app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))


app.use('/api/user', authRoute)

port = process.env.PORT || 4000;
app.listen(port, () => console.log('Server up and running on port ' + port))