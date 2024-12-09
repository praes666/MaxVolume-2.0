import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import tokenCheck from './tokenCheck'
import getLikedTracks from './getLikedTracks'
import { PlayerProvider } from './PlayerContent'

import Header from './Header'
import Mainpage from './Mainpage'
import LikedTracks from './likedTracks'
import Player from './Player'
import PalyListpage from './Playlistspage'

export default function App(){
    tokenCheck()
    // getLikedTracks()
    return(
        <Router>
            <PlayerProvider>
            <Header/>
            <Routes>
                <Route exact path='/' element={<Mainpage/>}/>
                <Route path='/likes' element={<LikedTracks/>}/>
                <Route path='/playlists' element={<PalyListpage/>}/>
            </Routes>
            <Player/>
            </PlayerProvider>
        </Router>
    )
}