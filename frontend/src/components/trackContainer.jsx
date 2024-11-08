import logo from '../img/Kraken_logo.jpeg'
import { IoEllipsisHorizontal } from "react-icons/io5"

export default function TrackContainer({img, name, author, file}){
    return(
        <div className="trackContainer">
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