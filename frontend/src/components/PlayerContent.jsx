import { createContext, useState, useContext, useEffect } from "react";

const PlayerContext = createContext()
export const usePlayer = () => useContext(PlayerContext)

export const PlayerProvider = ({ children }) => {
    const [currentTrackFile, setCurrentTrackFile] = useState(null)
    const [currentTrackInfo, setCurrentTrackInfo] = useState(null)

    const playTrack = (trackUrl, trackInfo) => {
        setCurrentTrackFile(trackUrl)
        setCurrentTrackInfo(trackInfo)
    }
    
    return(
        <PlayerContext.Provider value={{ currentTrackFile, currentTrackInfo, playTrack }}>
            {children}
        </PlayerContext.Provider>
    )
}