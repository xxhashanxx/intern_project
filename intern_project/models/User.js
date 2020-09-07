const mongoose = require('mongoose')

var userPost = mongoose.model('userPost',
{
    name:{
        type: String,
        
        min: 6
    },
    email:{
        type:String,
        
        max:225,
        min: 6
    },
    password:{
        type:String,
        
        max:1024,
        min:6
    },
    date:{
        type: Date,
        default:Date.now
    }
},'userPosts')

module.exports = {userPost}
