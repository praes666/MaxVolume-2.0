import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import tokenCheck from './tokenCheck'
import getLikedTracks from './getLikedTracks'

import Header from './Header'
import Mainpage from './Mainpage'
import LikedTracks from './likedTracks'
import Player from './Player'
import PalyListpage from './Playlistspage'
import { useEffect } from 'react'
import { usePlayer } from './PlayerContent'

export default function App(){
    const { setLiked } = usePlayer()

    useEffect(() => {
        tokenCheck()
        getLikedTracks(setLiked)
    }, [])

    return(
        <Router>
            <Header/>
                <Routes>
                    <Route exact path='/' element={<Mainpage/>}/>
                    <Route path='/likes' element={<LikedTracks/>}/>
                    <Route path='/playlists' element={<PalyListpage/>}/>
                </Routes>
            <Player/>
        </Router>
    )
}