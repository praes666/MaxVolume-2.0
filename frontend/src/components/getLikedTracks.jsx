import axios from "axios"

export default async function getLikedTracks(setLiked){
    try{
        const token = localStorage.getItem('token')
        if(token != null){
            const response = await axios.post('http://localhost:5000/music/getliked', {token})
            setLiked(response.data.tracks.reverse())
        }       
    }catch(error){
        console.error('getLikedTracks error:', error)
    }
}