import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import tokenCheck from './tokenCheck'

import Header from './Header.jsx'
import Mainpage from './Mainpage.jsx'
import LikedTracks from './likedTracks.jsx'
import Player from './Player.jsx'

export default function App(){
    tokenCheck
    return(
        <Router>
            <Header/>
            <Routes>
                <Route exact path='/' Component={Mainpage}/>
                <Route path='/likes' Component={LikedTracks}/>
            </Routes>
            <Player/>
        </Router>
    )
}