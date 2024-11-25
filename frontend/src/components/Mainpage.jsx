import { useEffect } from 'react'
import add from '../img/svo.jpg'
import tokenCheck from './tokenCheck'

export default function Mainpage(){

    useEffect(() => {
        tokenCheck()
    }, [])

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