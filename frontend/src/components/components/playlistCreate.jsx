import axios from 'axios'
import { useRef } from 'react'

export default function playlistCreating({ closeFunction }){
    const urlRef = useRef()
    const nameRef = useRef()

    const sendCreatePlaylistReq = async () => {
        try{
            const token = localStorage.getItem('token')
            if(token != null){
                await axios.post('http://localhost:5000/music/createPlaylist', {token: token, name: nameRef.current.value, img: urlRef.current.value})
                closeFunction(false)
            }
        }catch(error){
            console.error('likeRequestError: ', error)
        }
    }

    return(
        <div className="plCreateInv" onClick={() => {closeFunction(false)}}>
            <div className="plCreate" onClick={(e) => {e.stopPropagation()}}>
                <p>Создание плейлиста</p>
                <input type="text" ref={urlRef} placeholder="URL обложки"/>
                <input type="text" ref={nameRef} placeholder="Название плейлиста"/>
                <button onClick={sendCreatePlaylistReq}>Создать</button>
            </div>
        </div>
    )
}