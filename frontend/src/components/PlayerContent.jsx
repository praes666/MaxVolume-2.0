import React, { createContext, useState, useContext } from "react";

const PlayerContext = createContext()
export const usePlayer = () => useContext(PlayerContext)

export const PlayerProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null)

    const playerTrack = (trackUrl) => {
        setCurrentTrack(trackUrl)
    }
    
    return(
        <PlayerContext.Provider value={{ currentTrack, playerTrack }}>
            {children}
        </PlayerContext.Provider>
    )
}