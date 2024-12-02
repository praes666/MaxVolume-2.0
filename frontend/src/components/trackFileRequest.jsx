export default async function trackFileRequest(trackID, playTrack){
    try{
        const response = await fetch(`http://localhost:5000/music/tracks/${trackID}`)
            const audioBlob = await response.blob()
            const audioURL = URL.createObjectURL(audioBlob)
            playTrack(audioURL)
    }catch(error){
        console.error(error)
    }
}