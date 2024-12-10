import { CiCircleMore } from "react-icons/ci";
import { usePlayer } from "./PlayerContent";
import LikeButton from "./LikeButton";
import '../styles/TrackContainerSmall.css'

export default function TrackContainerSmall({ trackInfo, position, queue }){
    const { setCurrentTrackF, liked } = usePlayer()

    return(
        <div className="trackContainerSmall" onDoubleClick={() => setCurrentTrackF(trackInfo, queue)} >
            <p className="trackAuthorSmall">{position}</p>
            <img className="trackImgSmall" src={trackInfo?.img}/>
            <div className="trackInfoSmall">
                <p className="trackAuthorSmall">{trackInfo?.author}</p>
                <p>–</p>
                <p className="trackNameSmall">{trackInfo?.name}</p>
            </div>
            <LikeButton trackInfoId={trackInfo.id}/>
            <CiCircleMore className='hoverIcons' size={19}/>
        </div>
    )
}