const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const user = require('../models/user');
const router = express.Router();

const JWS_SECRET = 'slonoviapiska'

router.post('/', async (req, res) => {
    console.log(req.header)
    const {username, email, password} = req.body

    if(await User.findOne({username})){
        return res.status(400).json({message: "Пользователь уже существует"})
    }

    const new_user = new User({username, email, password: await bcrypt.hash(password, 10)})

    await new_user.save()
    res.status(201).json({message: "Пользователь зарегистрирован"})
})

router.post('/', async (req, res) => {
    const {email, password} = req.body

    
})