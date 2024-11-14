import logo from '../img/Kraken_logo.jpeg'

import TrackContainerBig from './trackContainerBig'

export default function LikedTracks(){
    return(
        <div className='centered'>
            <TrackContainerBig img={logo} name='Name' author='author'/>
        </div>
    )
}