import { useEffect, useState } from 'react'
import axios from 'axios'

import TrackContainerBig from './trackContainerBig'

import '../styles/likedTracks.css'

export default function LikedTracks(){
    const[trackList, setTrackList] = useState([])

    const getLikedTracks = async () => {
        try{
            const token = localStorage.getItem('token')
            if(token != null){
                const response = await axios.post('http://localhost:5000/music/getliked', {token})
                setTrackList(response.data.tracks)
            }else{
                window.location.replace('/') 
                alert('Вы не можете находиться тут, будучи не авторизованными. Вы были перенаправленны на главную страницу')
            }
            }catch(error){
            console.error('getLikedTracks error:', error)
        }
    }

    useEffect(() => {
        getLikedTracks()
    }, [])

    return(
        <div className='centered'>
            <div className='likedTracks'>
                {trackList.length > 0 ? trackList.map(trackInfo => {
                    return(<TrackContainerBig key={trackInfo.id} trackInfo={trackInfo}/>)
                })
                :
                    <div className='likedTracks'>
                        <h1 style={{color: '#ffffff'}}>ПУСТО</h1>
                    </div>
                }
            </div>
        </div>
    )
}