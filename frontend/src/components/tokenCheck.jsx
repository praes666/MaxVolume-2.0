import axios from 'axios'

export default async function tokenCheck(){
    try{
        if(localStorage.getItem('token') != null){
            const token = localStorage.getItem('token')
            const response = await axios.post('http://localhost:5000/auth/checkValidToken', {token})
            if(response.data.isValid != true){
                localStorage.removeItem('token')
                return false
            }
            return true
        }
    } catch(error){
        console.error('tokenCheck error:', error)
    }}