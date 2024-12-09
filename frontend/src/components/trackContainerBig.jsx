import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import { useState } from 'react'
import '../styles/TrackContainerBig.css'

import { usePlayer } from "./PlayerContent";

export default function TrackContainerBig({ trackInfo }){
    const [onImg, setOnImg] = useState(false)
    const { setCurrentTrackF, liked } = usePlayer()
    
    return(
        <div className="trackContainerBig">
            <div className="trackImgBig" onMouseEnter={() => setOnImg(true)} onMouseLeave={() => setOnImg(false)}>
                <img src={trackInfo.img}/>
                <div className='imgeHover' style= {{
                    display: onImg ? "block" : "none"
                }}>
                    <IoPlayCircleOutline className='hoverPlayButton' onClick={() => setCurrentTrackF(trackInfo)}/>
                    <div className="hoverButtonsDiv">
                        {liked.some((like) => like.id === trackInfo.id) ? <FaHeart className='hoverIcons'/> : <FaRegHeart className="hoverIcons"/>}
                        <CiCircleMore className='hoverIcons'/>
                    </div>
                </div>
            </div>
            <div className="trackInfoBig">
                <button className='trackNameBig'>
                    <p className="trackNameBig dots">{trackInfo.name}</p>
                </button>
                <button className='trackAuthorBig'>
                    <p className="dots">{trackInfo.author}</p>
                </button>
            </div>
        </div>
    )
}