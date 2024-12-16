import { CiCircleMore } from "react-icons/ci";
import { usePlayer } from "../scripts/PlayerContent";
import LikeButton from "./LikeButton";
import '../../styles/TrackContainerSmall.css'

import { Link } from 'react-router-dom';

export default function TrackContainerSmall({ trackInfo, position, queue }){
    const { setCurrentTrackF } = usePlayer()

    return(
        <div className="trackContainerSmall" onDoubleClick={() => setCurrentTrackF(trackInfo, queue)} >
            <p className="trackAuthorSmall">{position}</p>
            <img className="trackImgSmall" src={trackInfo?.img}/>
            <div className="trackInfoSmall">
                <Link className='trackAuthorSmall' to={'/artist/' + trackInfo.author}>
                    <p className="trackAuthorSmall">{trackInfo.author}</p>
                </Link>
                <p>–</p>
                <p className="trackNameSmall">{trackInfo?.name}</p>
            </div>
            <LikeButton trackInfoId={trackInfo.id}/>
            <CiCircleMore className='hoverIcons' size={19}/>
        </div>
    )
}