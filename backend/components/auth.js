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

    if(login=='' || password==''){
        return res.status(201).json({message: "Заполните все поля"})
    }

    db.get('SELECT * FROM users WHERE login = ?', [login], (err, user) => {
        if(!user) return res.status(201).json({message: 'Логина не существует'})
        if(!bcrypt.compareSync(password, user.password)) return res.status(201).json({message: 'Неверный пароль'})

        const token = jwt.sign({id: user.id, login: user.login}, JWS_SECRET, {expiresIn: '1h'})
        return res.status(201).json({message: 'Успешная авторизация', token: token})
    })
})

router.post('/checkValidToken', async(req, res) => {
    const {token} = req.body
    try{
        if(jwt.verify(token, JWS_SECRET)) return res.status(201).json({message: 'Валидный токен'})
            else return res.status(401).json({message: 'Невалидный токен'})
    }catch{
        return res.status(201).json({message: 'Невалидный токен', notValid: true})
    }
})

module.exports = router