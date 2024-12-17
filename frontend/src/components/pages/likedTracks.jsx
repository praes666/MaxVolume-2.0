import { usePlayer } from '../scripts/PlayerContent'
import TrackContainerBig from '../components/trackContainerBig'

export default function LikedTracks(){
    const { liked } = usePlayer()

    return(
        <div className='centered'>
            <h1>Ваши лайкнутые треки:</h1>
            <div className='midToLeftInfo'>
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