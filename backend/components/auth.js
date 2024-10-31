const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const router = express.Router();

const db = require('../config/db')

const JWS_SECRET = 'slonoviapiska'

router.post('/reg', async (req, res) => {
    const {login, email, password} = req.body
    
    if(login=='' || email=='' || password==''){
        return res.status(201).json({message: "Заполните все поля"})
    }

    db.get("SELECT * FROM users WHERE login = ?", [login], (err, info) => {
        if(info) return res.status(201).json({message: 'Логин уже зарегистрирован'})
        
        const hashedPassword = bcrypt.hashSync(password, 10)
        db.run('INSERT INTO users (login, email, password) VALUES (?, ?, ?)', [login, email, hashedPassword], (err, info) => {
            return res.status(201).json({message: 'Пользователь зарегистрирован'})
        })
    })

})

router.post('/login', async (req, res) => {
    const {login, password} = req.body
    console.log(req.body)



    return res.status(201).json({message: "Пользователь авторизирован"})
})

module.exports = router