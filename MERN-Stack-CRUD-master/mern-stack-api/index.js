require('./db')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
/////
const authRoute = require('./controllers/auth')

/////
var postMessageRoutes = require('./controllers/postMessageController')


var app = express()
app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))
app.listen(4000,()=>console.log('Server started at : 4000'))


app.use('/postMessages',postMessageRoutes);
////
app.use('/api/user',authRoute)
////