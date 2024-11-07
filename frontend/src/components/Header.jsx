import logo from '../img/Kraken_logo.jpeg'
import lupa from '../img/search.png'
// import empty_profile from '../img/empty_profile.png'

import { useState } from 'react'
import axios from 'axios'

import Auth from './Auth'

export default function Header() {
	const [isVisible, setVisible] = useState(false)
	
	const deauth = async () => {
		localStorage.removeItem('token')
		alert('Вы вышли из аккаунта!')
	}

	const checkValidToken = async () => {
        try{
			const token = localStorage.getItem('token')
            const response = await axios.post('http://localhost:5000/auth/checkValidToken', {token})
			alert(response.data.message)
			if(response.data.notValid == true) localStorage.removeItem('token')
        } catch(error){
            console.error(error)
        }
    }

	const profile_click = () => {
		if(isVisible){setVisible(false)}
		else{setVisible(true)}
	}

    return(
		<div className="head_back">
			<div className="header centered">
				
				<button  className="logo">
					<img src={logo}/>
					
				</button>
				<button className="head_button_left">
					<p>Главная</p>
				</button>                
				<button className="head_button_left">
					<p>Новинки</p>
				</button>
				<div className="search">
					<input type="text" placeholder="Поиск..."/>
					<button>
						<img src={lupa} alt=""/>
					</button>
				</div>    
				<button className="head_button_right" onClick={checkValidToken}>
					<p>Библиотека</p>
				</button>
				{localStorage.getItem('token') != null ? (
					<button className="head_button_right profile" onClick={profile_click}>
					<p>{JSON.parse(atob(localStorage.getItem('token').split('.')[1])).login}</p>
				</button>
				):(
					<button className="head_button_right profile" onClick={profile_click}>
						<p>Вход</p>
					</button>
				)}
			</div>



			{isVisible ? ( localStorage.getItem('token') != null ? (
					<div className="dropdown">
						<button>
							<img src={logo} alt=""/>
							<p>{JSON.parse(atob(localStorage.getItem('token').split('.')[1])).login}</p>
						</button>
						<button>
							<img src={logo} alt=""/>
							<p>Лайки</p>
						</button>
						<button>
							<img src={logo} alt=""/>
							<p>Плейлисты</p>
						</button>
						<button>
							<img src={logo} alt=""/>
							<p>Подписки</p>
						</button>
						<button onClick={deauth}>
							<img src={logo} alt=""/>
							<p>Выход</p>
						</button>
					</div>
				):(<Auth/>)
			):
		<div></div>
		}

		</div>
    )
}