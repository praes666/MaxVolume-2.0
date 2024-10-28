import { createRoot } from 'react-dom/client'

import Header from './components/Header.jsx'
import Mainpage from './components/Mainpage.jsx'
import Player from './components/Player.jsx'

import './styles/const.css'
import './styles/header.css'
import './styles/player.css'
import './styles/mainpage.css'

createRoot(document.getElementById('root')).render(
    <div className='full'>
        <Header/>
        <Mainpage />
        <Player/>
    </div>
)
