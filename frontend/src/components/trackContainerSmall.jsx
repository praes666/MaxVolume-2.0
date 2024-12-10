import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { CiCircleMore } from "react-icons/ci";
import '../styles/TrackContainerSmall.css'

export default function TrackContainerSmall({ trackInfo, position }){
    
    return(
        <div className="trackContainerSmall" >
            <p className="trackAuthorSmall">{position}</p>
            <img className="trackImgSmall" src={trackInfo?.img}/>
            <div className="trackInfoSmall">
                <p className="trackAuthorSmall">{trackInfo?.author}</p>
                <p>–</p>
                <p className="trackNameSmall">{trackInfo?.name}</p>
            </div>
            <FaRegHeart color="white"/>
            <CiCircleMore color="white" size={19}/>
        </div>
    )
}