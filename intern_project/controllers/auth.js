const express = require('express')
var router = express.Router()
var {userPost} = require('../models/User')
const {registerValidation,loginValidation}=require('../validate/validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

////////////////////////
router.post('/request',async(req,res)=>{

    ////validate
    const {error} = registerValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    const emailExist = await userPost.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email exist')
    
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password,salt);

    var user = new userPost({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
    })
    try {
        const savedUser = await user.save()
        res.send({user: user._id})
    } catch (err) {
        res.status(400).send(res)
    }
});
//login
router.post('/login',async(req,res)=>{
    //validation
    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    // check email exit
    const user = await userPost.findOne({email: req.body.email})
    if(!user) {return res.status(400).send('Email not exist')}
    //password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if (!validPass) return res.status(400).send("invalid passowrd")

    //token
    const token = jwt.sign({_id: user._id},process.env.TOKEN_SECRET)
    res.header('aut-token',token).send(token)
    
    //res.send('logged in')
})

/////////////////////////
module.exports = router
