import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import tokenCheck from './tokenCheck'
import { PlayerProvider } from './PlayerContent'

import Header from './Header'
import Mainpage from './Mainpage'
import LikedTracks from './likedTracks'
import Player from './Player'

export default function App(){
    tokenCheck()
    return(
        <Router>
            <PlayerProvider>
            <Header/>
            <Routes>
                <Route exact path='/' element={<Mainpage/>}/>
                <Route path='/likes' element={<LikedTracks/>}/>
            </Routes>
            <Player/>
            </PlayerProvider>
        </Router>
    )
}