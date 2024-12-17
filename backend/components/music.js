const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();
const path = require('path')

const db = require('../config/db')

const secret = require('../JWT_SECRET.json');
const { get } = require('http');
const { log } = require('console');
const { route } = require('./auth');
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

router.post('/createPlaylist', async (req, res) => {
    const {token, name, img} = req.body
    try{
        if(name && img){
            db.run('INSERT INTO playlists(name, img, creator_id) VALUES(?, ?, ?)', [name, img, jwt.decode(token, JWS_SECRET).id], (err, info) => {
                if(err) console.log('createPlaylist BD error: ', err)
                return res.status(201).json({message: 'Плейлист успешно создан'})
            })
        }
        
    }catch(error){
        console.log('createPlaylist error: ', error)
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
                db.all(`SELECT tracks.id, tracks.name AS name, artists.name AS author, tracks.img  FROM tracks JOIN artists ON tracks.author = artists.id WHERE artists.name = ?`, [req.params.artistName], (err, tracks) => {
                    if(err) console.log('artist tracks error: ', err)
                    return res.status(201).json({artistInfo: artistInfo, tracks: tracks})
                })
            }
            else return res.status(404).json({message: 'Ошибка обработки запроса на сервере'})
        })


    }catch(error){
        console.log('get Artist Tracks error: ', error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.post('/subArtistManager', async (req, res) => {
    const {token, artistData} = req.body
    try{
        db.get('SELECT * FROM subscribes WHERE user_id = ? AND artist_id = ?', [jwt.decode(token, JWS_SECRET).id, artistData.artistInfo.id], (err, feedback) => {
            if(err) console.log('subToArtist db error: ', err)
            if(feedback){
                db.run('DELETE FROM subscribes WHERE user_id = ? AND artist_id = ?', [jwt.decode(token, JWS_SECRET).id, artistData.artistInfo.id], (err, feedback) => {
                    if(err) console.log('unSub of', artistData.artistInfo.id, 'by', jwt.decode(token, JWS_SECRET).id, 'error: ', err) 
                })
            }
            else{
                db.run('INSERT INTO subscribes (user_id, artist_id) VALUES (?, ?)', [jwt.decode(token, JWS_SECRET).id, artistData.artistInfo.id], (err, feedback) => {
                    if(err) console.log('subscribe by', jwt.decode(token, JWS_SECRET).id, 'to', artistData.artistInfo.id, 'error: ', err)
                })
            }
            return res.status(201).json()
        })
    }catch(error){
        console.log('subToArtist error: ', error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.post('/getSubStatus', async (req, res) => {
    const {token, artistData} = req.body
    try{
        db.get('SELECT * FROM subscribes WHERE user_id = ? AND artist_id = ?', [jwt.decode(token, JWS_SECRET).id, artistData.artistInfo.id], (err, feedback) => {
            db.get(`SELECT COUNT(*) AS subs FROM subscribes WHERE artist_id = ?`, [artistData.artistInfo.id], (err, subs) => {
                if(err) console.log('subToArtist db error: ', err)
                if(feedback){
                    return res.status(201).json({isSub: true, subs: subs})
                }else return res.status(201).json({isSub: false, subs: subs})
            })
        })
        
    }catch(error){
        console.log('subToArtist error: ', error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

router.post('/getSubArtists', async (req, res) => {
    const {token} = req.body
    try{
        db.all('SELECT artists.id, artists.name, artists.img FROM artists JOIN subscribes ON subscribes.artist_id = artists.id WHERE user_id = ?', [jwt.decode(token, JWS_SECRET).id], (err, artists) => {
            if(err) console.log('getSubArtists BD error: ', err)
            return res.status(201).json({artists: artists})
        })
    }catch(error){
        console.log('gewtAll error: ', error)
    }
})

module.exports = router