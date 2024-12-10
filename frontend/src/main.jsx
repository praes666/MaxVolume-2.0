import { createRoot } from 'react-dom/client'

import App from './components/mainComponent.jsx'
import { PlayerProvider } from '../src/components/PlayerContent'

import './styles/const.css'

createRoot(document.getElementById('root')).render(
    <PlayerProvider>
        <App/>
    </PlayerProvider>
        
)
