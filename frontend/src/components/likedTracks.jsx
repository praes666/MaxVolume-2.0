import { useEffect, useState } from 'react'
import { usePlayer } from './PlayerContent'
import axios from 'axios'

import TrackContainerBig from './trackContainerBig'
import getLikedTracks from './getLikedTracks'
import '../styles/likedTracks.css'

export default function LikedTracks(){
    const { liked } = usePlayer()
    
    // useEffect(() => {
    //     getLikedTracks()
    // }, [])
    
    return(
        <div className='centered'>
            <div className='likedTracks'>
                {liked.length > 0 ? liked.map(trackInfo => {
                    return(<TrackContainerBig key={trackInfo.id} trackInfo={trackInfo}/>)
                })
                :
                <h1>ПУСТО</h1>
                }
            </div>
        </div>
    )
}