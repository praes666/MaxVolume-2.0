import { IoPlayCircleOutline } from "react-icons/io5";
import { MdOutlinePlaylistAdd, MdOutlinePlaylistPlay  } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import { useState } from 'react'
import { usePlayer } from "../scripts/PlayerContent";
import { CiCircleMore } from "react-icons/ci";
import { Link } from 'react-router-dom';
import axios from "axios";
import LikeButton from "./LikeButton";
import PlaylistMicro from "./playlistMicro";
import '../../styles/TrackContainerBig.scss'

export default function TrackContainerBig({ trackInfo, queue }){
    const { setCurrentTrackF } = usePlayer()
    const [onImg, setOnImg] = useState(false)
    const [moreInfoView, setMoreInfoView] = useState(false)
    const [playLists, setPlaylists] = useState([])
    const [ATPLView, setATPLView] = useState(false)

    const getPlaylists = async () => {
        try{
            const token = localStorage.getItem('token')
            if(token != null){
                const response = await axios.post('http://localhost:5000/music/getplaylists', {token})
                console.log(response.data.playlists)
                setPlaylists(response.data.playlists)
            }
        }catch(error){
            console.log('getPlaylists error', error)
        }
    }

    return(
        <div className="trackContainerBig">
            <div className="trackImgBig" onMouseEnter={() => setOnImg(true)} onMouseLeave={() => setOnImg(false)}>
                <img src={trackInfo.img}/>
                <div className='imgeHover' style= {{
                    display: onImg ? "flex" : "none"
                }}>
                    <IoPlayCircleOutline className='hoverPlayButton' onClick={() => setCurrentTrackF(trackInfo, queue)}/>
                    <div className="hoverButtonsDiv">
                        <LikeButton trackInfoId={trackInfo.id}/>
                        <CiCircleMore className='hoverIcons' onClick={() => setMoreInfoView(true)}/>
                    </div>
                    <div className="moreInfoFieldBig" style= {{
                    display: moreInfoView ? "flex" : "none"
                    }}>
                        <div className="moreInfoButton">
                            <MdOutlinePlaylistPlay size={(21)}/>
                            <p>Добавить в очередь</p>
                        </div>
                        <div className="moreInfoButton" onClick={() => {getPlaylists(); setATPLView(true)}}>
                            <MdOutlinePlaylistAdd size={(20)}/>
                            <p>Добавить в плейлист</p>
                                <div className="ATPLView" style= {{
                                    display: ATPLView ? "flex" : "none"
                                }}>
                                    {playLists.length > 0 ? playLists.map(playlist => {
                                        return(<PlaylistMicro key={playlist.id} playlistInfo={playlist} trackInfo={trackInfo}/>)
                                    })
                                    :
                                    <p>Нет доступных плейлистов</p>
                                    }
                            </div>
                        </div>
                        <div className="moreInfoButton">
                            <IoIosLink/>
                            <p>Поделиться</p>
                        </div>
                        <div className="moreInfoButton">
                            <RiErrorWarningLine size={(15)}/>
                            <p>Пожаловаться</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="trackInfoBig">
                <button className='trackNameBig'>
                    <p className="trackNameBig dots">{trackInfo.name}</p>
                </button>
                <Link className='trackAuthorBig' to={'/artist/' + trackInfo.author}>
                    <p className="dots">{trackInfo.author}</p>
                </Link>
            </div>
        </div>
    )
}