export default async function trackFileRequest(trackID){
    try{
        const response = await fetch(`http://localhost:5000/music/tracks/${trackID}`)
            const audioBlob = await response.blob()
            const audioURL = URL.createObjectURL(audioBlob)
            return (audioURL)
    }catch(error){
        console.error(error)
    }
}