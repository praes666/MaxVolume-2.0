import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import TrackContainerBig from '../components/trackContainerBig'
import '../../styles/artistPage.scss'

export default function ArtistPage(){
    const { artistName } = useParams()
    const [artistData, setArtistData] = useState()
    const [subs, setSubs] = useState(0)
    const [isSub, setIsSub] = useState(null)

    const getArtistData = async () => {
        try{
            if(artistName){
                const response = await axios.get(`http://localhost:5000/music/getArtistData/${artistName}`)
                setArtistData(response.data)
                setSubs(response.data.subs.subs)
            }
        }catch(error){
            console.log('getArtistData error: ', error)
        }
    }
    
    const getSubStatus = async () => {
        try{
            const token = localStorage.getItem('token')
            if(token){
                const response = await axios.post('http://localhost:5000/music/getSubStatus', {token, artistData})
                setIsSub(response.data.isSub)
                setSubs(response.data.subs.subs)
            }
        }catch(error){
            console.log('getSubStatus error: ', error)
        }
    }
    
    const subArtistManager = async () => {
        try{
            const token = localStorage.getItem('token')
            if(token){
                await axios.post('http://localhost:5000/music/subArtistManager', {token, artistData})
                getSubStatus()
            }
            else alert('Для подписки на артиста необходимо авторизоваться')
        }catch(error){
            console.log('subArtistManager error: ', error)
        }
    }

    useEffect(() => {
        getArtistData()
    }, [])

    useEffect(() => {
        if(artistData){
            getSubStatus()
        }
    }, [artistData])

    return(
        <div className="centered">
            <div className='artistInfo'>
                <div className='artistTopInfo'>
                    <img className='avatar' src={artistData?.artistInfo.img} alt="" />
                    <div>
                        <h1>{artistData?.artistInfo.name}</h1>
                        <p>
                            {subs}
                            {subs%10 == 0 || subs%10 > 5?
                                ' подписчиков'
                                :
                                subs%10 == 1 ?
                                ' подписчик' : ' подписчика'
                            }
                        </p>
                        <div onClick={subArtistManager}>
                            <h4>{isSub ? 'ВЫ ПОДПИСАНЫ' : 'ПОДПИСАТЬСЯ'}</h4>
                        </div>
                    </div>
                </div>
                <div className='artistTrackInfo'>
                    <h1>Все треки этого исполнителя:</h1>
                    <div className='midToLeftInfo'>
                        {artistData?.tracks.length > 0 ? artistData.tracks.map(track => {
                                return <TrackContainerBig key={track.id} trackInfo={track} queue={artistData.tracks}/>
                            }):
                            <div className='midToLeftInfo'>
                                <h1>У этого исполнителя пока нет треков (странно, зачем тогда эта страница нужна)</h1>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}