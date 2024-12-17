import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { usePlayer } from './scripts/PlayerContent'

import Header from './components/Header'
import Mainpage from './pages/Mainpage'
import LikedTracks from './pages/likedTracks'
import Player from './components/Player'
import PalyListpage from './pages/Playlistspage'
import ArtistPage from './pages/ArtistPage'
import SubArtistsPage from './pages/SubArtistsPage'

import tokenCheck from './scripts/tokenCheck'
import getLikedTracks from './scripts/getLikedTracks'

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
                    <Route path='/artist/:artistName' element={<ArtistPage/>}/>
                    <Route path='/subscribes' element={<SubArtistsPage/>}/>
                </Routes>
            <Player/>
        </Router>
    )
}