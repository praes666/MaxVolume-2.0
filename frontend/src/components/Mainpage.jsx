import add from '../img/svo.jpg'
import page_stuf from '../img/bebra.png'

export default function Mainpage(){
    return(
        <div className="centered">
        <div className="main">
            <div className="ad">
                <a href="https://службапоконтракту.рф/">
                    <img src={add} alt=""/>
                </a>
            </div>
            <img src={page_stuf} alt=""/>
        </div>
    </div>
    )
}