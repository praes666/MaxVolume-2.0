import axios from 'axios'

export default async function trackFileRequest(trackID){
    try{
        const response = await axios.get(`http://localhost:5000/music/tracks/${trackID}`)
            console.log(response)
    }catch(error){
        console.error(error)
    }
}