import add from '../img/svo.jpg'
import page_stuf from '../img/bebra.png'

import TrackContainer from './trackContainer'

export default function Mainpage(){
    return(
        <div className="centered">
        <div className="main">
            <div className="ad">
                <a href="https://службапоконтракту.рф/">
                    <img src={add} alt=""/>
                </a>
            </div>
            <TrackContainer/>
            {/* <img src={page_stuf} alt=""/> */}
            {/* <img src={page_stuf} alt=""/> */}
        </div>
    </div>
    )
}