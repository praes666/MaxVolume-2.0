import axios from "axios"
import { useEffect } from "react"

export default function palyListpage(){
    const getPlaylists = async () => {
        try{
            const token = localStorage.getItem('token')
            if(token != null){
                const response = await axios.post('http://localhost:5000/music/getplaylists', {token})
                console.log('response', response.data)
            }else{
                window.location.replace('/') 
                alert('Вы не можете находиться тут, будучи не авторизованными. Вы были перенаправленны на главную страницу')
            }
        }catch(error){
            console.log('getPlaylists error', error)
        }
    }

    useEffect(() => {
        getPlaylists()
    }, [])

    return(
        <div className="centered">
            <h1>zxc</h1>
        </div>
    )
}