import axios from 'axios'

export default async function tokenCheck(){
    try{
        const token = localStorage.getItem('token')
        const response = await axios.post('http://localhost:5000/auth/checkValidToken', {token})
        alert(response.data.isValid)
        if(response.data.isValid != true){
            localStorage.removeItem('token')
            return false
        }
        return true
    } catch(error){
        console.error(error)
    }}