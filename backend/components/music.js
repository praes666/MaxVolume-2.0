const express = require('express')
const jwt = require('jsonwebtoken');
const router = express.Router();

const db = require('../config/db')

const secret = require('../JWT_SECRET.json')
const JWS_SECRET = secret.JWT_SECRET

router.post('/getliked', async (req, res) => {
    const {token} = req.body
    
    try{        
        db.all('SELECT * FROM liked WHERE user_id = ?', [jwt.decode(token, JWS_SECRET).id], (err, tracks) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Ошибка сервера' });
            }
            if (!tracks) return res.status(404).json({ message: 'Нет лайкнутых треков' })
            
        //     tracks.forEach((e) => {
        //         db.get('SELECT * FROM tracks WHERE id = ?', [e.track_id], (err, info) => {
        //             if (err) {
        //                 console.error(err);
        //                 return res.status(500).json({ message: 'Ошибка сервера' });
        //             }
        //             tracks_info.push(info)
        //             console.log(tracks_info)
        //         })
        //     })
        //     console.log('a', tracks_info)
        //     return res.status(200).json({tracks: tracks_info})

            db.get('SELECT * FROM tracks WHERE id = ?', [tracks[1].track_id], (err, info) => {
                return res.status(200).json({tracks: info})
            })

        })
    }catch(error){
        console.log(error)
        return res.status(500).json({message: 'Ошибка сервера'})
    }
})

module.exports = router