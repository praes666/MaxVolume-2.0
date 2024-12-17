import { useEffect, useState } from 'react'
import axios from 'axios'
import ArtistMiniCard from '../components/ArtistMiniCard'
import '../../styles/SubArtistsPage.scss'

export default function SubArtistsPage(){
    const [artists, setArtists] = useState([])

    const getSubArtists = async () => {

        try{
            const token = localStorage.getItem('token')
            if(token != null){
                const response = await axios.post('http://localhost:5000/music/getSubArtists', {token})
                setArtists(response.data.artists)
            }else{
                window.location.replace('/') 
                alert('Вы не можете находиться тут, будучи не авторизованными. Вы были перенаправленны на главную страницу')
            }
        }catch(error){
            console.log('getSubArtists error', error)
        }
    }

    useEffect(() => {
        getSubArtists()
    }, [])

    return(
        <div className='centered'>
            <div className='midToLeftInfo'>
                {artists.length > 0 ? artists.map(artist => {
                    return (<ArtistMiniCard key={artist.id} artistData={artist}/>)
                })
                :
                <h1>Вы ещё ни на кого не подписались</h1>
                }
            </div>    
        </div>
    )
}