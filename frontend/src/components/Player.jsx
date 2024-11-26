import { MdSkipPrevious } from "react-icons/md"
import { MdSkipNext } from "react-icons/md"
import { IoPause } from "react-icons/io5"
import { IoPlay } from "react-icons/io5"
import { IoRepeat } from "react-icons/io5"
import { IoShuffle } from "react-icons/io5"
import { IoVolumeMute } from "react-icons/io5"
import { IoVolumeLow } from "react-icons/io5"
import { IoVolumeMedium } from "react-icons/io5"
import { IoVolumeHigh } from "react-icons/io5"
import { FaHeart } from "react-icons/fa6"
import { FaRegHeart } from "react-icons/fa6"
import '../styles/player.css'

import track from '../../../tracks/track.mp3'

import { useState, useRef, useEffect }from 'react'
import { IconContext } from "react-icons"

import logo from '../img/Kraken_logo.jpeg'

export default function Player(){
    const[isPlaying, setPlaying] = useState(false)
    const[currentTime, setCurrentTime] = useState(0)
    const[duration, setDuration] = useState(0)

    const[showVolume, setVolumeActive] = useState(false)
    const[currentVolume, setVolume] = useState(0.5)

    const audioRef = useRef(null)

    const VolSliderChange = (e) => {
        audioRef.current.volume = (Math.pow(e.target.value, 1.5)/5).toFixed(2)
        setVolume(e.target.value)
    }

    const timeUpdateF = () => {
        setCurrentTime(audioRef.current.currentTime)
        setDuration(audioRef.current.duration)
    }
    
    const DurSliderChange = (e) => {
        audioRef.current.currentTime = e.target.value
        setCurrentTime(e.target.value)
    }
    
    const playerPlay = () => {
        audioRef.current.volume = (Math.pow(0.5, 1.5)/5).toFixed(2)
        audioRef.current.play()
        setPlaying(true)
    }
    const playerPause = () => {
        audioRef.current.pause()
        setPlaying(false)
    }
    
    const playerControl = () => {
        if(isPlaying){playerPause()}
        else{playerPlay()}
    }

    function volumeControl(){
        if(showVolume){setVolumeActive(false)}
		else{setVolumeActive(true)}
    }

    function timeFormating(time){
        const minutes = Math.floor(time/60)
        const seconds = Math.floor(time%60).toString().padStart(2, '0')
        return `${minutes}:${seconds}`
    }

    useEffect(() => {
        audioRef.current.addEventListener("timeupdate", timeUpdateF)
        return() => {
            audioRef.current.removeEventListener("timeupdate", timeUpdateF)
    }})

    return(
        <div className="inv">
            <div className='centered'>
                <div className="player">
                <IconContext.Provider value={{className: "playerIcons" }}>
                    <div className="side_button">
                        <MdSkipPrevious/>
                        {isPlaying ? 
                        <IoPause onClick={playerControl}/> 
                        :
                        <IoPlay onClick={playerControl}/>
                        }
                        <MdSkipNext/>
                        <IoRepeat/>
                        <IoShuffle/>
                    </div>
                    <div className="button_mid">
                        <p className="time">{timeFormating(currentTime)}</p>
                        <input
                        type="range"
                        value={currentTime}
                        max={duration}
                        onChange={DurSliderChange}
                        />
                        <p className="time">{timeFormating(duration)}</p>
                    </div>
                    <div className="side_button">
                            <IoVolumeHigh onClick={volumeControl}/>
                        {showVolume ? (
                            <div className='volume'>
                                <p>{currentVolume}</p>
                                <input type="range"
                                defaultValue={currentVolume}
                                max="1"
                                step="0.01"
                                onChange={VolSliderChange}
                                />
                            </div>
                        ):<div></div>
                        }
                        <FaHeart/>
                        <div className="trackinfo">
                            <img src={logo} alt=""/>
                            <div className='ti_text'>
                                <p className='track_name'>Название трека</p>
                                <p className='track_author'>Автор</p>
                            </div>
                        </div>
                    </div>
                </IconContext.Provider>
                </div>
            </div>
            <audio ref={audioRef} src={track} preload='auto'></audio>
        </div>
    )
}