const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

//const {register, login} = require ('../controllers/authController');
// User Registration
router.post('/register', async(req, res) => {
    try{
        const{ username, password, email} = req.body;
        const user = new User({username, password, email});
        await user.save();
        res.status(201).json({message: 'User registered successfully'}); 
    }
    catch(err) {
        res.status(400).json({message: err.message});
    }
});

//User Login
router.post('/login', async(req, res) => {
    try{
        const{username, password, email} = req.body;
        const user = await User.findOne({username});

        if (!user || (await bcrypt.compare(password, user.password))){
            throw new Error('invalid credentials');
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d'});
        res.status(200).json({ token});
    }
    catch(err){
        res.status(401).json({message: err.message});
    }
});




module.exports = router;