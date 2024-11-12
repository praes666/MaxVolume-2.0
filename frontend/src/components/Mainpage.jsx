import add from '../img/svo.jpg'
import page_stuf from '../img/bebra.png'
import logo from '../img/Kraken_logo.jpeg'

import TrackContainerBig from './trackContainerBig'

export default function Mainpage(){
    return(
        <div className="centered">
        <div className="main">
            <div className="ad">
                <a href="https://службапоконтракту.рф/">
                    <img src={add} alt=""/>
                </a>
            </div>
            <TrackContainerBig img={logo} name='Name' author='author'/>
            <img src={page_stuf} alt=""/>
        </div>
    </div>
    )
}