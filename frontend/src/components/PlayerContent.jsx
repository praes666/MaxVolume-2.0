import { createContext, useState, useContext } from "react";

const PlayerContext = createContext()
export const usePlayer = () => useContext(PlayerContext)

export const PlayerProvider = ({ children }) => {
    const [queue, setQueue] = useState([])
    const [currentTrack, setCurrentTrack] = useState(null)
    const [currentTrackIndex, setCurrentTrackIndex] = useState(null)
    
    const setQueueFunc = (q) => {
        setQueue(q)
    }

    const setCurrentTrackF = (info) => {
        setCurrentTrackIndex(info.id)
        setCurrentTrack(info)
    }

    const prevTrack = () => {
        console.log('prev')
        if(queue.length > 0){
            if(currentTrackIndex > 0){
                setCurrentTrackIndex(currentTrackIndex-1)
            }
            else{
                setCurrentTrackIndex(queue.length-1)
            }
        }
    }

    const nextTrack = () => {
        console.log('next')
        if(queue.length > 0){
            if(currentTrackIndex < queue.length-1){
                setCurrentTrackIndex(currentTrackIndex+1)
            }
            else{
                setCurrentTrackIndex(0)
            }
        }
    }

    return(
        <PlayerContext.Provider value={{ currentTrackIndex, currentTrack, queue, setQueueFunc, setCurrentTrackF, prevTrack, nextTrack }}>
            {children}
        </PlayerContext.Provider>
    )
}