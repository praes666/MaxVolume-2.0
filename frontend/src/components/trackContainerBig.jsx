import logo from '../img/Kraken_logo.jpeg'
import { IoEllipsisHorizontal } from "react-icons/io5"

import '../styles/TrackContainerBig.css'

export default function TrackContainerBig({ img, name, author, file }){
    return(
        <div className="trackContainerBig">
            <div className="trackImg">
                <img src={img}/>
            </div>
            <div className="trackInfo">
                <button className='trackName'>
                    <p>{name}</p>
                </button>
                <button className='trackAuthor'>
                    <p>{author}</p>
                </button>
                <button className='trackTime'>
                    <p>Длительность</p>
                </button>
                <button>
                    <IoEllipsisHorizontal />
                </button>
            </div>
        </div>
    )
}