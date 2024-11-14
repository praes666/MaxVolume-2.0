import logo from '../img/Kraken_logo.jpeg'
import axios from 'axios'
import TrackContainerBig from './trackContainerBig'

import tokenCheck from './tokenCheck'

import '../styles/likedTracks.css'

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
            <div className='likedTracks'>
                <TrackContainerBig img={logo} name='1' author='author'/>
                <TrackContainerBig img={logo} name='2' author='author'/>
                <TrackContainerBig img={logo} name='3' author='author'/>
                <TrackContainerBig img={logo} name='4' author='author'/>
                <TrackContainerBig img={logo} name='5' author='author'/>
                <TrackContainerBig img={logo} name='6' author='author'/>
                <TrackContainerBig img={logo} name='7' author='author'/>
                <TrackContainerBig img={logo} name='8' author='author'/>
            </div>
        </div>
    )
}