import { createContext, useState, useContext } from "react";

const PlayerContext = createContext()
export const usePlayer = () => useContext(PlayerContext)

export const PlayerProvider = ({ children }) => {
    const [queue, setQueue] = useState([])
    const [currentTrackIndex, setcurrentTrackIndex] = useState(null)
    // const [currentTrackFile, setCurrentTrackFile] = useState(null)
    // const [currentTrackInfo, setCurrentTrackInfo] = useState(null)
    
    // const playTrack = (trackUrl, trackInfo) => {
    //     setCurrentTrackFile(trackUrl)
    //     setCurrentTrackInfo(trackInfo)
    // }
    
    const SetQueueFunc = (q) => {
        setQueue(q)
    }

    const setCurrentTrack = (index) => {
        if(index >= 0 && index < queue.length){
            setcurrentTrackIndex(index)
        }
    }

    const prevTrack = () => {
        if(queue.length > 0){
            if(currentTrackIndex > 0){
                setcurrentTrackIndex(currentTrackIndex-1)
            }
            else{
                setcurrentTrackIndex(queue.length-1)
            }
        }
    }

    const nextTrack = () => {
        if(queue.length > 0){
            if(currentTrackIndex < queue.length-1){
                setcurrentTrackIndex(currentTrackIndex+1)
            }
            else{
                setcurrentTrackIndex(0)
            }
        }
    }

    return(
        // <PlayerContext.Provider value={{ currentTrackFile, currentTrackInfo, playTrack }}>
        <PlayerContext.Provider value={{ currentTrackIndex, currentTrack: queue[currentTrackIndex], queue, SetQueueFunc, setCurrentTrack, prevTrack, nextTrack }}>
            {children}
        </PlayerContext.Provider>
    )
}