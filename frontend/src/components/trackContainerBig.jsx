import logo from '../img/Kraken_logo.jpeg'
import { IoEllipsisHorizontal } from "react-icons/io5"

import '../styles/TrackContainerBig.css'

export default function TrackContainerBig({img, name, author, file}){
    return(
        <div className="trackContainerBig">
            <div className="trackImg">
                <img src={logo}/>
            </div>
            <div className="trackInfo">
                <p className='trackName'>Название</p>
                <p className='trackAuthor'>Автор</p>
                <p>Длительность</p>
                <IoEllipsisHorizontal />
            </div>
        </div>
    )
}