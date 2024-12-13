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
        db.all(`SELECT tracks.id AS id, tracks.name, artists.name AS author, tracks.img FROM liked JOIN tracks ON liked.track_id = tracks.id JOIN artists ON tracks.author = artists.id WHERE liked.user_id = ?`, [jwt.decode(token, JWS_SECRET).id], (err, tracks) => {
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
            return res.status(201).json({playlists: playlists})
        })
    }catch(error){
        console.log('getplaylists error: ', error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.get('/getTracksFromPlaylist/:playlistID', async (req, res) => {
    try{
        db.all('SELECT tracks.id AS id, tracks.name, artists.name AS author, tracks.img FROM playlisttracks JOIN tracks ON playlisttracks.track_id = tracks.id JOIN artists ON tracks.author = artists.id WHERE playlisttracks.playlist_id = ?', [req.params.playlistID], (err, tracks) => {
            if (!tracks) return res.status(404).json({message: 'Ошибка обработки запроса на сервере'})
            return res.status(201).json({tracks: tracks})
        })
    }catch(error){
        console.log('getTracksFromPlaylist error: ', error)
    }
})

router.get('/getAllTracks', async (req, res) => {
    try{
        db.all('SELECT tracks.id, tracks.name AS name, artists.name AS author, tracks.img  FROM tracks JOIN artists ON tracks.author = artists.id', (err, tracks) => {
            if(err) console.log('getAllTracks BD error: ', err)
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

router.post('/likeManager/:likeID', async (req, res) => {
    const {token} = req.body
    try{
        db.get(`SELECT * FROM liked WHERE user_id = ${jwt.decode(token, JWS_SECRET).id} AND track_id = ${req.params.likeID}`, (err, info) => {
            if(info){
                db.run('DELETE FROM liked WHERE user_id = ? AND track_id = ?', [jwt.decode(token, JWS_SECRET).id, req.params.likeID])
            }
            else{
                db.run(`INSERT into liked (user_id, track_id) VALUES(${jwt.decode(token, JWS_SECRET).id}, ${req.params.likeID})`)
            }
            return res.status(201).json({message: 'Всё гуд'})
        })
    }catch(error){
        console.log('music like manager error: ', error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.get('/getArtistData/:artistName', async (req, res) => {
    try{
        db.get(`SELECT * FROM artists WHERE name = ?`, [req.params.artistName], (err, artistInfo) => {
            if(err) console.log('artistInfo error: ', err)
            if(artistInfo){
                db.get(`SELECT COUNT(*) AS subs FROM subscribes WHERE artist_id = ?`, [artistInfo.id], (err, subs) => {
                    if(err) console.log('artist subs error: ', err)
                    db.all(`SELECT tracks.id, tracks.name AS name, artists.name AS author, tracks.img  FROM tracks JOIN artists ON tracks.author = artists.id WHERE artists.name = ?`, [req.params.artistName], (err, tracks) => {
                        if(err) console.log('artist tracks error: ', err)
                        return res.status(201).json({artistInfo: artistInfo, subs: subs, tracks: tracks})
                    })
                })
            }
            else return res.status(404).json({message: 'Ошибка обработки запроса на сервере'})
        })


    }catch(error){
        console.log('get Artist Tracks error: ', error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.post('/subToArtist', async (req, res) => {
    const {token, artistData} = req.body
    try{
        db.run('INSERT INTO subscribes (user_id, artist_id) VALUES (?, ?)', [jwt.decode(token, JWS_SECRET).id, artistData.artistInfo.id], (err, feedback) => {
            if(err) console.log('subToArtist db error: ', err)
            return res.status(201)
        })
    }catch(error){
        console.log('subToArtist error: ', error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

module.exports = router