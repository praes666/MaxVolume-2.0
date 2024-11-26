const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const router = express.Router();

const db = require('../config/db')

const secret = require('../JWT_SECRET.json')
const JWS_SECRET = secret.JWT_SECRET

router.post('/reg', async (req, res) => {
    const {login, email, password} = req.body
    
    if(login=='' || email=='' || password==''){
        return res.status(201).json({message: "Заполните все поля"})
    }

    db.get("SELECT * FROM users WHERE login = ?", [login], (err, info) => {
        if (err) {
            console.log('reg error: ', err)
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
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
        if (err) {
            console.log('login error: ', err);
            return res.status(500).json({ message: 'Ошибка сервера' });
        }
        if(!user) return res.status(201).json({message: 'Логина не существует'})
        if(!bcrypt.compareSync(password, user.password)) return res.status(201).json({message: 'Неверный пароль'})

        const token = jwt.sign({id: user.id, login: user.login}, JWS_SECRET, {expiresIn: '1h'})
        return res.status(201).json({message: 'Успешная авторизация', token: token})
    })
})

router.post('/checkValidToken', async(req, res) => {
    const {token} = req.body
    try{
        if(jwt.verify(token, JWS_SECRET)) return res.status(201).json({isValid: true})
            else return res.status(201).json({isValid: false})
    }catch(error){
        console.log('TokinValidError db error:', error)
        return res.status(201).json({isValid: false})
    }
})

module.exports = router