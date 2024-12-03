import { IoPlayCircleOutline } from "react-icons/io5";
import { IoPauseCircleOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import { useState } from 'react'
import TrackFileRequest from "./trackFileRequest";
import '../styles/TrackContainerBig.css'

import { usePlayer } from "./PlayerContent";

export default function TrackContainerBig({ trackInfo }){
    const [onImg, setOnImg] = useState(false);
    const { setCurrentTrackF } = usePlayer()

    return(
        <div className="trackContainerBig">
            <div className="trackImg" onMouseEnter={() => setOnImg(true)} onMouseLeave={() => setOnImg(false)}>
                <img src={trackInfo.img}/>
                <div className='imgeHover' style= {{
                    display: onImg ? "block" : "none"
                }}>
                    <IoPlayCircleOutline className='hoverPlayButton' onClick={() => setCurrentTrackF(trackInfo)}/>
                    <div className="hoverButtonsDiv">
                        <FaHeart className='hoverIcons'/>
                        <CiCircleMore className='hoverIcons'/>
                    </div>
                </div>
            </div>
            <div className="trackInfo">
                <button className='trackName'>
                    <p className="trackName">{trackInfo.name}</p>
                </button>
                <button className='trackAuthor'>
                    <p>{trackInfo.author}</p>
                </button>
            </div>
        </div>
    )
}