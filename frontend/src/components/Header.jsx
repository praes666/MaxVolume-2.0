import { IoSearch } from "react-icons/io5"
import logo from '../img/Kraken_logo.jpeg'

import { useState } from 'react'
import { Link } from "react-router-dom"

import Auth from './Auth'
import tokenCheck from './tokenCheck'

export default function Header() {
	const [isVisible, setVisible] = useState(false)

	const deauth = async () => {
		localStorage.removeItem('token')
		location.reload();
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
					<Link to='/'>
				<button className="head_button_left">
						<p>Главная</p>
				</button>                
					</Link>
				<button className="head_button_left">
					<p>Новинки</p>
				</button>
				<div className="search">
					<input type="text" placeholder="Поиск..."/>
					<IoSearch/>
				</div>    
				<button className="head_button_right" onClick={tokenCheck}>
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
						<Link to='/likes'>
							<button>
								<img src={logo} alt=""/>
								<p>Лайки</p>
							</button>
						</Link>
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