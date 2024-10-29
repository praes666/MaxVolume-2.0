import { useState } from 'react'
import axios from 'axios'

export default function Auth(){
    const [isLoginShow, setLoginShow] = useState(true)
    const [regData, setRegData] = useState({username: '', email: '', password: ''})


    const handleRegChange = (e) => {
        setRegData({...regData, [e.target.name]: e.target.value})
    }

    const handleRegSubmit = async () => {
        try{
            const response = await axios.post('http://localhost:5000/api/auth/reg')
            alert(response.data.message)
        } catch(error){
            alert('Ошибка регистрации: ', error)
        }
    }

    const loginSwitch = () => {
		if(isLoginShow){setLoginShow(false)}
		else{setLoginShow(true)}
	}

    return(
        isLoginShow ? (
            <div className='reg'>
                <input type="text" name="" placeholder="Логин"/>
                <input type="text" name="" placeholder="Пароль"/>
                <button className='reg_button'>
                    <p>Войти</p>
                </button>
                <button className='dop_auth' onClick={loginSwitch}>
                    <p>Зарегестрироваться</p>
                </button>
            </div>
        ):(
        <div className='reg'>
            <input type="text" name="" placeholder="Логин" onChange={handleRegChange}/>
            <input type="text" name="" placeholder="Почта" onChange={handleRegChange}/>
            <input type="text" name="" placeholder="Пароль" onChange={handleRegChange}/>
            <input type="text" name="" placeholder="Повторите пароль" onChange={handleRegChange}/>
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