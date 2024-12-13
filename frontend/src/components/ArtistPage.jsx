import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import TrackContainerBig from './trackContainerBig'
import '../styles/artistPage.scss'

export default function ArtistPage(){
    const { artistName } = useParams()
    const [artistData, setArtistData] = useState()

    const getArtistInfo = async () => {
        try{
            if(artistName){
                const response = await axios.get(`http://localhost:5000/music/getArtistData/${artistName}`)
                setArtistData(response.data)
            }
        }catch(error){
            console.log('getArtistInfo error: ', error)
        }
    }
    
    const subToArtist = async () => {
        try{
            const token = localStorage.getItem('token')
            if(token){
                await axios.post('http://localhost:5000/music/subToArtist', {token, artistData})
            }
        }catch(error){
            console.log('subToArtist error: ', error)
        }
    }

    useEffect(() => {
        getArtistInfo()
    }, [])

    return(
        <div className="centered">
            <div className='artistInfo'>
                <div className='artistTopInfo'>
                    <img className='avatar' src={artistData?.artistInfo.img} alt="" />
                    <div>
                        <h1>{artistData?.artistInfo.name}</h1>
                        <p>
                            {artistData?.subs.subs}
                            {artistData?.subs.subs%10 == 0 || artistData?.subs.subs%10 > 5?
                                ' подписчиков'
                                :
                                artistData?.subs.subs%10 == 1 ?
                                ' подписчик' : ' подписчика'
                            }
                        </p>
                        <div onClick={subToArtist}>
                            <h4>ПОДПИСАТЬСЯ</h4>
                        </div>
                    </div>
                </div>
                <div className='artistTrackInfo'>
                    <h1>Все треки этого исполнителя:</h1>
                    <div className='trackContainerBigHolder'>
                        {artistData?.tracks.length > 0 ? artistData.tracks.map(track => {
                                return <TrackContainerBig key={track.id} trackInfo={track} queue={artistData.tracks}/>
                            }):
                            <div className='trackContainerBigHolder'>
                                <h1>У этого исполнителя пока нет треков (странно, зачем тогда эта страница нужна)</h1>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}