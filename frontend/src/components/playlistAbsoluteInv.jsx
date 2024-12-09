import { useEffect, useState } from "react"
import TrackContainerSmall from "./trackContainerSmall"
import axios from "axios"

export default function PlaylistAbsoluteInv({ playlist, playlistFunc }){
    const [tracklist, setTracklis] = useState([])
    
    const getPlaylistTracks = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/music/getTracksFromPlaylist/${playlist.id}`)
            setTracklis(response.data.tracks)
        }catch(error){
            console.error('getPlaylistTracks', error)
        }
    }

    useEffect(() => {
        getPlaylistTracks()
    }, [])

    return(
        <div className="playlistInv" onClick={() => {playlistFunc(false)}}>
            <div className="playlistInfo" onClick={(e) => {e.stopPropagation()}}>
                <div className="playlistTopInfo">
                    <img className="playlistTopImg" src={playlist.img} alt="" />
                    <h1 className="playlistName">{playlist.name}</h1>
                </div>
                <div className="trackList">
                    {tracklist.length > 0 ? 
                        tracklist.map(track => {
                            return (<TrackContainerSmall key={track.id} trackInfo={track}/>)
                        })
                        :
                        <h2>Пока что тут пусто. Добавте музыки!</h2>
                    }
                </div>
            </div>
        </div>
    )
}