if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require('mongoose')

// const uri = process.env.DATABASE_URL
const uri = process.env.DATABASE_URL;
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, config);
const db = mongoose.connection;

db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to DB'))


mongoose.set('useFindAndModify', false);
module.exports = mongoose