import axios from 'axios'
import add from '../../img/bebra.png'
import '../../styles/mainpage.css'
import { useEffect, useState } from 'react'

import TrackContainerBig from '../components/trackContainerBig'

export default function Mainpage(){
    const [allTracks, setAllTracks] = useState([])

    const getAllTracks = async () => {
        const response = await axios.get('http://localhost:5000/music/getAllTracks')
        setAllTracks(response.data.tracks)
    }

    useEffect(() => {
        getAllTracks()
    }, [])

    return(
        <div className="centered">
            <div className="main">
                <div className="ad">
                    <img src={add} alt=""/>
                </div>
            <h1>Все доступные треки, на данный момент:</h1>
            <div className='trackContainerBigHolder'>
                {allTracks.length > 0 ? allTracks.map(track => {
                    return(<TrackContainerBig key={track.id} trackInfo={track} queue={allTracks}/>)
                }):
                <div className='trackContainerBigHolder'>
                    <h1>ХЗ ТУТ НИЧЁ НЕТ, НО ДОЛЖНО БЫТЬ</h1>
                </div>
                }
            </div>
        </div>
    </div>
    )
}