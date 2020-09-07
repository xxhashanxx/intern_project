require('./db')
const express = require('express')
const bodyParser = require('body-parser')
const postRoute = require('./controllers/postMessageController')
/////
var authRoute = require('./controllers/auth')

/////

var app = express()
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'));

app.use('/api',authRoute)
app.use('/api/posts',postRoute)

app.listen(3000,()=>console.log('Server started at : 4001'))


