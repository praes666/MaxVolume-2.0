import { useState } from 'react'

export default function Auth(){
    const [isLogin, setLogin] = useState(true)

    const loginSwitch = () => {
		if(isLogin){setLogin(false)}
		else{setLogin(true)}
	}

    return(
        isLogin ? (
            <div className='reg'>
                <input type="text" name="" id="" placeholder="Логин"/>
                <input type="text" name="" id="" placeholder="Пароль"/>
                <button className='reg_button'>
                    <p>Войти</p>
                </button>
                <button className='dop_auth' onClick={loginSwitch}>
                    <p>Зарегестрироваться</p>
                </button>
            </div>
        ):(
        <div className='reg'>
            <input type="text" name="" id="" placeholder="Логин"/>
            <input type="text" name="" id="" placeholder="Почта"/>
            <input type="text" name="" id="" placeholder="Пароль"/>
            <input type="text" name="" id="" placeholder="Повторите пароль"/>
            <button className='reg_button'>
                <p>Зарегестрироваться</p>
            </button>
            <button className='dop_auth' onClick={loginSwitch}>
                <p>Войти</p>
            </button>
        </div>
    )
    )
}