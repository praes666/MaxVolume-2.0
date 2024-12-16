import { createRoot } from 'react-dom/client'

import { PlayerProvider } from '../src/components/scripts/PlayerContent'
import App from './components/mainComponent.jsx'

import './styles/const.css'

createRoot(document.getElementById('root')).render(
    <PlayerProvider>
        <App/>
    </PlayerProvider>
)
