import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import '../styles/TrackContainerSmall.css'

import { useState } from "react"

export default function TrackContainerSmall({ trackInfo }){
    const [onImg, setOnImg] = useState(false)
    
    return(
        <div className="trackContainerSmall">
            <img className="trackImgSmall" src={trackInfo?.img}/>
            <div className="trackInfoSmall">
                <p className="trackAuthorSmall">{trackInfo?.author}</p>
                <p>–</p>
                <p className="trackNameSmall">{trackInfo?.name}</p>
            </div>
        </div>
    )
}