import axios from "axios"
import { usePlayer } from './PlayerContent'

export default async function getLikedTracks(){
    const { setLiked } = usePlayer()

    try{
        const token = localStorage.getItem('token')
        if(token != null){
            const response = await axios.post('http://localhost:5000/music/getliked', {token})
            console.log('liked_tracks: ', response.data.tracks)
            setLiked(response.data.tracks.reverse())
        }
        else{
            if(!window.location('/')){
                window.location.replace('/') 
                alert('Вы не можете находиться тут, будучи не авторизованными. Вы были перенаправленны на главную страницу')
            }
        }        
    }catch(error){
        console.error('getLikedTracks error:', error)
    }
}