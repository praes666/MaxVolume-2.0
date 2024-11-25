import { useEffect, useState } from 'react'
import axios from 'axios'

import TrackContainerBig from './trackContainerBig'
import tokenCheck from './tokenCheck'
import logo from '../img/Kraken_logo.jpeg'

import '../styles/likedTracks.css'

export default function LikedTracks(){
    const[trackList, setTrackList] = useState([])

    const getLikedTracks = async () => {
        if(await tokenCheck() == true){
            try{
                const token = localStorage.getItem('token')
                const response = await axios.post('http://localhost:5000/music/getliked', {token})
                setTrackList(response.data.tracks)
            }catch(error){
                console.error(error)
            }
        }
        else{
            console.log('Токен не валидный')
        }
    }

    useEffect(() => {
        if(getLikedTracks() != true){
            return(
                <p>Вы не авторизованны</p>
            )
        }
        
    }, [])

    return(
        <div className='centered'>
            <div className='likedTracks'>
                {trackList.length > 0 ? trackList.map(currentTrack => {
                    return(<TrackContainerBig key={currentTrack.id} img={currentTrack.img} name={currentTrack.name} author={currentTrack.author}/>)
                })
                :
                    <div className='likedTracks'>
                        <p>Вы ещё не добавили ни одного трека в избранное</p>
                    </div>
                }
            </div>
        </div>
    )
}