import axios from "axios"
import { useEffect, useState } from "react"

import PlaylistCard from "../components/playlistCard"
import PlaylistAbsoluteInv from "../components/playlistAbsoluteInv"
import '../../styles/playlists.css'

export default function palyListpage(){
    const [playlists, setPlaylists] = useState([])
    const [openPlaylist, setOpenPlaylist] = useState(null)

    const getPlaylists = async () => {
        try{
            const token = localStorage.getItem('token')
            if(token != null){
                const response = await axios.post('http://localhost:5000/music/getplaylists', {token})
                setPlaylists(response.data.playlists)
            }else{
                window.location.replace('/') 
                alert('Вы не можете находиться тут, будучи не авторизованными. Вы были перенаправленны на главную страницу')
            }
        }catch(error){
            console.log('getPlaylists error', error)
        }
    }

    useEffect(() => {
        getPlaylists()
    }, [])

    return(
        <div className="centered">
            <h1>Ваши плейлист:</h1>
            <div className="midToLeftInfo">
                {playlists.length > 0 ? playlists.map(playlist => {
                    return (<PlaylistCard key={playlist.id} name={playlist.name} img={playlist.img} playlist={playlist} onClickFunc={setOpenPlaylist}/>)
                })
                :
                <h1>У вас ещё не созданно ни одного плейлиста</h1>
                }
            {openPlaylist ? 
                <PlaylistAbsoluteInv playlist={openPlaylist} playlistFunc={setOpenPlaylist}/>        
                :
                <div></div>
            }
            </div>
        </div>
    )
}