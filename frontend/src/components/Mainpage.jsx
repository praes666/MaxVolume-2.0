import add from '../img/svo.jpg'
import '../styles/mainpage.css'

export default function Mainpage(){
    return(
        <div className="centered">
        <div className="main">
            <div className="ad">
                <img src={add} alt=""/>
            </div>
        </div>
    </div>
    )
}