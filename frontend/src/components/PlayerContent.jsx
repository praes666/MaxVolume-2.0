import { object } from "prop-types";
import { createContext, useState, useContext } from "react";

const PlayerContext = createContext()
export const usePlayer = () => useContext(PlayerContext)

export const PlayerProvider = ({ children }) => {
    const [queue, setQueue] = useState([])
    const [liked, setLiked] = useState([])
    const [currentTrack, setCurrentTrack] = useState(null)

    const setLikedFunc = (l) => {
        setLiked(l)
    }

    const setCurrentTrackF = (info, queue) => {
        setCurrentTrack(info)
        setQueue(queue)
    }

    const prevTrack = () => {
        if(queue.indexOf(currentTrack)-1 >= 0){       
            setCurrentTrack(queue[queue.indexOf(currentTrack)-1])
        }
        else setCurrentTrack(queue[queue.length-1])
    }

    const nextTrack = () => {
        if(queue.indexOf(currentTrack)+1 < queue.length){
            setCurrentTrack(queue[queue.indexOf(currentTrack)+1])
        }
        else setCurrentTrack(queue[0])
    }

    return(
        <PlayerContext.Provider value={{ currentTrack, queue, liked, setCurrentTrackF, setLikedFunc, setLiked, prevTrack, nextTrack }}>
            {children}
        </PlayerContext.Provider>
    )
}