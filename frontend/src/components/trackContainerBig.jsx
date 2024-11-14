import { IoEllipsisHorizontal } from "react-icons/io5"

import '../styles/TrackContainerBig.css'

export default function TrackContainerBig({ img, name, author, file }){
    return(
        <div className="trackContainerBig">
            <div className="trackImg">
                <img className="trackImg" src={img}/>
            </div>
            <div className="trackInfo">
                <button className='trackName'>
                    <p>{name}</p>
                </button>
                <button className='trackAuthor'>
                    <p>{author}</p>
                </button>
                <p>Длительность</p>
                <button>
                    <IoEllipsisHorizontal />
                </button>
            </div>
        </div>
    )
}