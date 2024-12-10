import axios from 'axios'

export default async function tokenCheck(){
    try{
        const token = localStorage.getItem('token')
        if(token != null){
            const response = await axios.post('http://localhost:5000/auth/checkValidToken', {token})
            if(response.data.isValid != true){
                localStorage.removeItem('token')
                return false
            }
            return true
        }
        else{
            if(!window.location('/')){
                window.location.replace('/') 
                alert('Вы не можете находиться тут, будучи не авторизованными. Вы были перенаправленны на главную страницу')
            }
        }  
    } catch(error){
        console.error('tokenCheck error:', error)
    }}