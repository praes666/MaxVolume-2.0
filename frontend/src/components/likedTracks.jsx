import { useEffect, useState } from 'react'
import axios from 'axios'

import TrackContainerBig from './trackContainerBig'
import tokenCheck from './tokenCheck'

import '../styles/likedTracks.css'
import { redirect } from 'react-router'

export default function LikedTracks(){
    const[trackList, setTrackList] = useState([])

    const getLikedTracks = async () => {
        try{
            const token = localStorage.getItem('token')
            if(token != null){
                const response = await axios.post('http://localhost:5000/music/getliked', {token})
                setTrackList(response.data.tracks)
            }else{
                alert('Вы не можете находиться тут, будучи не авторизованными. Вы будете перенаправленны на главную страницу')
                window.location.replace('/') 
            }
            }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        getLikedTracks()
    }, [])

    return(
        <div className='centered'>
            <div className='likedTracks'>
                {trackList.length > 0 ? trackList.map(currentTrack => {
                    return(<TrackContainerBig key={currentTrack.id} img={currentTrack.img} name={currentTrack.name} author={currentTrack.author}/>)
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