import axios from "axios"

export default async function getLikedTracks(setLiked){
    try{
        const token = localStorage.getItem('token')
        if(token != null){
            const response = await axios.post('http://localhost:5000/music/getliked', {token})
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