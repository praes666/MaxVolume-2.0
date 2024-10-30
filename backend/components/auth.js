const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const router = express.Router();

const db = require('../components/auth')

const JWS_SECRET = 'slonoviapiska'

router.post('/reg', async (req, res) => {
    const {login, email, password} = req.body
    console.log(req.body)

    if(!login || !email || !password) return res.status(400).json({error: 'заполните все поля'})

    try{
        db.run("SELECT * FROM users WHERE ligon = ?", [login], (err, user) => {
            if(err) return 
        })
    } catch(error){
        res.status(500).json({error: 'Ошибка решистрации'})
    }

    return res.status(201).json({message: "Пользователь зарегистрирован"})
})

router.post('/login', async (req, res) => {
    const {login, password} = req.body
    console.log(req.body)



    return res.status(201).json({message: "Пользователь авторизирован"})
})

module.exports = router