import { useState } from 'react'
import axios from 'axios'

export default function Auth(){
    const [isLoginShow, setLoginShow] = useState(true)
    const [regData, setRegData] = useState({login: '', email: '', password: ''})
    const [loginData, setLoginData] = useState({login: '', password: ''})

    // const token = ''

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegChange = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value });
    };

    const handleRegSubmit = async () => {
        try{
            const response = await axios.post('http://localhost:5000/auth/reg', regData)
            if(response.status == 201) alert(response.data.message)
        } catch(error){
            console.error(error)
        }
    }

    const handleLoginSubmit = async () => {
        try{
            const response = await axios.post('http://localhost:5000/auth/login', loginData)
            if(response.status == 201){
                alert(response.data.message)
                // token = response.data
            } 

        } catch(error){
            console.error(error)
        }
    }

    const loginSwitch = () => {
		if(isLoginShow){setLoginShow(false)}
		else{setLoginShow(true)}
	}

    return(
        isLoginShow ? (
            <div className='reg'>
                <input type="text" name='login' placeholder="Логин" onChange={handleLoginChange}/>
                <input type="text" name='password' placeholder="Пароль" onChange={handleLoginChange}/>
                <button className='reg_button' onClick={handleLoginSubmit}>
                    <p>Войти</p>
                </button>
                <button className='dop_auth' onClick={loginSwitch}>
                    <p>Зарегестрироваться</p>
                </button>
            </div>
        ):(
        <div className='reg'>
            <input type="text" name='login' placeholder="Логин" onChange={handleRegChange}/>
            <input type="text" name='email' placeholder="Почта" onChange={handleRegChange}/>
            <input type="text" name='password' placeholder="Пароль" onChange={handleRegChange}/>
            <button className='reg_button' onClick={handleRegSubmit}>
                <p>Зарегестрироваться</p>
            </button>
            <button className='dop_auth' onClick={loginSwitch}>
                <p>Войти</p>
            </button>
        </div>
    )
    )
}