import { GoPlay } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";

import { useState } from 'react'
import '../styles/TrackContainerBig.css'

export default function TrackContainerBig({ img, name, author }){

    const [isMove, setIsMove] = useState(false);

    return(
        <div className="trackContainerBig">
            <div className="trackImg" onMouseEnter={() => setIsMove(true)} onMouseLeave={() => setIsMove(false)}>
                <img src={img}/>
                <div className='imgeHover' style= {{
                    display: isMove ? "block" : "none"
                }}>
                    <GoPlay className='hoverPlayButton'/>
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