import logo from '../img/Kraken_logo.jpeg'
import axios from 'axios'
import TrackContainerBig from './trackContainerBig'

import tokenCheck from './tokenCheck'

export default function LikedTracks(){
    const getLikedTracks = async () => {
        if(await tokenCheck() == true){
            try{
                const token = localStorage.getItem('token')
                const response = await axios.post('http://localhost:5000/music/getliked', {token})
                console.log(response.data.message)
            }catch(error){
                console.error(error)
            }
        }
        else{
            console.log('Токен не валидный')
        }
    }

    getLikedTracks()

    return(
        <div className='centered'>
            <TrackContainerBig img={logo} name='Name' author='author'/>
            <TrackContainerBig img={logo} name='Name' author='author'/>
        </div>
    )
}