import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import { useState } from 'react'
import { usePlayer } from "./PlayerContent";
import LikeButton from "./LikeButton";
import '../styles/TrackContainerBig.css'


export default function TrackContainerBig({ trackInfo, queue }){
    const [onImg, setOnImg] = useState(false)
    const { setCurrentTrackF, liked } = usePlayer()
    
    return(
        <div className="trackContainerBig">
            <div className="trackImgBig" onMouseEnter={() => setOnImg(true)} onMouseLeave={() => setOnImg(false)}>
                <img src={trackInfo.img}/>
                <div className='imgeHover' style= {{
                    display: onImg ? "block" : "none"
                }}>
                    <IoPlayCircleOutline className='hoverPlayButton' onClick={() => setCurrentTrackF(trackInfo, queue)}/>
                    <div className="hoverButtonsDiv">
                        <LikeButton trackInfoId={trackInfo.id}/>
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