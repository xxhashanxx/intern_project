const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()


mongoose.connect(
    process.env.DB_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true},
    err => {
        if (!err)
            console.log('Mongodb connection succeeded')
        else
            console.log('Error while connecting MongoDB : ' + JSON.stringify(err, undefined, 2))
    })