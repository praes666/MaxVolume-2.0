import { IoPlayCircleOutline } from "react-icons/io5";
import { IoPauseCircleOutline } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import { useState } from 'react'
import TrackFileRequest from "./trackFileRequest";
import '../styles/TrackContainerBig.css'

import { usePlayer } from "./PlayerContent";

export default function TrackContainerBig({ id, img, name, author }){
    const [onImg, setOnImg] = useState(false);
    const { playTrack } = usePlayer()

    return(
        <div className="trackContainerBig">
            <div className="trackImg" onMouseEnter={() => setOnImg(true)} onMouseLeave={() => setOnImg(false)}>
                <img src={img}/>
                <div className='imgeHover' style= {{
                    display: onImg ? "block" : "none"
                }}>
                    <IoPlayCircleOutline className='hoverPlayButton' onClick={() => TrackFileRequest(id, playTrack)}/>
                    <div className="hoverButtonsDiv">
                        <FaHeart className='hoverIcons'/>
                        <CiCircleMore className='hoverIcons'/>
                    </div>
                </div>
            </div>
            <div className="trackInfo">
                <button className='trackName'>
                    <p className="trackName">{name}</p>
                </button>
                <button className='trackAuthor'>
                    <p>{author}</p>
                </button>
            </div>
        </div>
    )
}