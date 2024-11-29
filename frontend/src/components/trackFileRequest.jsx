import axios from 'axios'

export default async function trackFileRequest(trackID){
    try{
        const response = await axios.get(`http://localhost:5000/music/tracks/${trackID}`)
            console.log(response)
            // return JSON.stringify({
            //     track: response.data.track
            // })
    }catch(error){
        console.error(error)
    }
}