import { usePlayer } from './PlayerContent'
import TrackContainerBig from './trackContainerBig'
import '../styles/likedTracks.css'

export default function LikedTracks(){
    const { liked } = usePlayer()

    return(
        <div className='centered'>
            <div className='likedTracks'>
                {liked.length > 0 ? liked.map(trackInfo => {
                    return(<TrackContainerBig key={trackInfo.id} trackInfo={trackInfo} queue={liked}/>)
                })
                :
                <h1>ПУСТО</h1>
                }
            </div>
        </div>
    )
}