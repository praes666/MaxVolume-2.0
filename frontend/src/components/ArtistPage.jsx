import { useEffect } from 'react'
import '../styles/artistPage.scss'
import { useParams } from 'react-router'

export default function ArtistPage(){
    const { artistName } = useParams()

    useEffect(() => {
        
    }, [])

    return(
        <div className="centered">
            <div className='artistInfo'>
                <div className='artistTopInfo'>
                    <p>{artistName}</p>
                </div>
                <div className='artistTrackInfo'>
                    
                </div>
            </div>
        </div>
    )
}