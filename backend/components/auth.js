const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/user');

const JWS_SECRET = 'slonoviapiska'

router.post('/reg', async (req, res) => {
    console.log(req.header)
    const {username, email, password} = req.body

    if(await User.findOne({username})){
        return res.status(400).json({message: "Пользователь уже существует"})
    }

    const new_user = new User({username, email, password: await bcrypt.hash(password, 10)})

    await new_user.save()
    res.status(201).json({message: "Пользователь зарегистрирован"})
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body

    if(!User.findOne({email})) return res.status(400).json({message: "Пользователя не существует"})

    if(!bcrypt.compare(password, User.password)) return res.status(400).json({message: "Неверный пароль"})

    const token = jwt.sign({userId: User._id}, JWS_SECRET, {expiresIn: '1h'})
})

module.exports = router