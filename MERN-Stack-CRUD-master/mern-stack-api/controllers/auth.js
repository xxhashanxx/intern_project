const express = require('express')
var router = express.Router()
const User = require('../models/user')

////////////////////////
router.post('/register',async(req,res)=>{
    const user = new user({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const saveUser = await user.save();
        res.send(saveUser);
    } catch (error) {
        res.status(400).send(err);
    }
});

/////////////////////////
module.exports = router;
