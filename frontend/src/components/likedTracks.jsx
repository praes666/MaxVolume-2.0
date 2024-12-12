import { usePlayer } from './PlayerContent'
import TrackContainerBig from './trackContainerBig'

export default function LikedTracks(){
    const { liked } = usePlayer()

    return(
        <div className='centered'>
            <div className='trackContainerBigHolder'>
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