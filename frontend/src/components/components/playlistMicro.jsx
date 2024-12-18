import axios from "axios"

export default function playlistMicro({ playlistInfo, trackInfo }){

    const addToPlaylist = async () => {
        try{
            if(localStorage.getItem('token') != null){
                await axios.post(`http://localhost:5000/music/addToPlaylist`, {trackID: trackInfo.id, playlistID: playlistInfo.id})
            }else alert('Для добовления трека в плейлист, необходимо авторизоваться')
        }catch(error){
            console.error('addToPlaylist error: ', error)
        }
    }

    return(
        <div className="playlistMicro" onClick={addToPlaylist}>
            <img src={playlistInfo.img} alt="" />
            <p className="dots">{playlistInfo.name}</p>
        </div>
    )
}