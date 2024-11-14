const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();

const db = require('../config/db')

const secret = require('../JWT_SECRET.json')
const JWS_SECRET = secret.JWT_SECRET

router.post('/getliked', async(req, res) => {
    const {token} = req.body
    db.get('SELECT * FROM liked WHERE user_id = ?', [jwt.decode(token, JWS_SECRET).id], (err, tracks) => {
        return res.status(201).json({})
    })
    return res.status(201).json({message: 'Успешная авторизация'})
})

module.exports = router