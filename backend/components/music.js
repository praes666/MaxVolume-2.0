const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();
const path = require('path')

const db = require('../config/db')

const secret = require('../JWT_SECRET.json');
const { get } = require('http');
const { log } = require('console');
const JWS_SECRET = secret.JWT_SECRET

router.post('/getliked', async (req, res) => {
    const {token} = req.body
    try{
        db.all(`SELECT tracks.id AS id, tracks.name, tracks.author, tracks.img FROM liked JOIN tracks ON liked.track_id = tracks.id WHERE liked.user_id = ?`, [jwt.decode(token, JWS_SECRET).id], (err, tracks) => {
            return res.status(200).json({tracks: tracks})
        })
    }catch(error){
        console.log('music servise getliked error: ', error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.post('/getplaylists', async (req, res) => {
    const {token} = req.body
    try{
        db.all('SELECT id, name, img FROM playlists WHERE creator_id = ?', [jwt.decode(token, JWS_SECRET).id], (err, playlists) => {
            if (!playlists) return res.status(404).json({message: 'Ошибка обработки запроса на сервере'})
            res.status(201).json({playlists: playlists})
        })
    }catch(error){
        console.log('getplaylists error: ', error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.get('/getAllTracks', async (req, res) => {
    try{
        db.all('SELECT tracks.id AS id, tracks.name, tracks.author, tracks.img  FROM tracks', (err, tracks) => {
            return res.status(200).json({tracks: tracks})
        })
    }catch(error){
        console.log('gewtAll error: ', error)
    }
})

router.get('/tracks/:trackID', async (req, res) => {
    try{
        db.get('SELECT * FROM tracks WHERE id = ?', [req.params.trackID], (err, info) => {
            if (!info) return res.status(404).json({message: 'Ошибка обработки запроса на сервере'})
            res.status(201).sendFile(path.join(__dirname, '/../tracks/', info.file_name))
        })
    }catch(error){
        console.log('music servise tracks error: ', error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

module.exports = router