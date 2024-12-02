import { useState } from 'react'
import axios from 'axios'

export default function Auth(){
    const [isLoginShow, setLoginShow] = useState(true)
    const [regData, setRegData] = useState({login: '', email: '', password: ''})
    const [loginData, setLoginData] = useState({login: '', password: ''})

    const clearAuth = () => {
        setLoginData({login: '', password: ''})
        setRegData({login: '', email: '', password: ''})
    }

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegChange = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value });
    };

    const handleRegSubmit = async () => {
        try{
            const response = await axios.post('http://localhost:5000/auth/reg', regData)
            clearAuth()
            if(response.status == 201) alert(response.data.message)
        } catch(error){
            console.error(error)
        }
    }

    const handleLoginSubmit = async () => {
        try{
            const response = await axios.post('http://localhost:5000/auth/login', loginData)
            clearAuth()
            if(response.status == 201){
                localStorage.setItem('token', response.data.token)
                location.reload();
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
                <input type="text" name='login' value={loginData.login} placeholder="Логин" onChange={handleLoginChange}/>
                <input type="text" name='password' value={loginData.password} placeholder="Пароль" onChange={handleLoginChange}/>
                <button className='reg_button mybutton' onClick={handleLoginSubmit}>
                    <p>Войти</p>
                </button>
                <button className='dop_auth' onClick={loginSwitch}>
                    <p>Зарегестрироваться</p>
                </button>
            </div>
        ):(
        <div className='reg'>
            <input type="text" name='login' value={regData.login} placeholder="Логин" onChange={handleRegChange}/>
            <input type="text" name='email' value={regData.email} placeholder="Почта" onChange={handleRegChange}/>
            <input type="text" name='password' value={regData.password} placeholder="Пароль" onChange={handleRegChange}/>
            <button className='reg_button mybutton' onClick={handleRegSubmit}>
                <p>Зарегестрироваться</p>
            </button>
            <button className='dop_auth' onClick={loginSwitch}>
                <p>Войти</p>
            </button>
        </div>
    )
    )
}