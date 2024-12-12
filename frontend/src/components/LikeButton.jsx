import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { usePlayer } from "./PlayerContent";
import axios from 'axios'
import getLikedTracks from './getLikedTracks'
import { useEffect, useState } from "react";

export default function LikeButton({ trackInfoId }){
    const { liked, setLiked } = usePlayer()
    const [isLiked, setIsLiked] = useState(false)

    const likeRequest = async () => {
        try{
            const token = localStorage.getItem('token')
            if(token != null && trackInfoId != null){
                await axios.post(`http://localhost:5000/music/likeManager/${trackInfoId}`, {token})
                await getLikedTracks(setLiked)
            }
        }catch(error){
            console.error('likeRequestError: ', error)
        }
    }

    useEffect(() => {
        setIsLiked(liked.some((like) => like.id === trackInfoId))
    }, [liked, trackInfoId])

    return(
        isLiked ?
        <FaHeart className='hoverIcons' onClick={() => likeRequest()}/>
        :
        <FaRegHeart className='hoverIcons' onClick={() => likeRequest()}/>
    )

}