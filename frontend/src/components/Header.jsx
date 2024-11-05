import logo from '../img/Kraken_logo.jpeg'
import lupa from '../img/search.png'
import empty_profile from '../img/empty_profile.png'

import { useState } from 'react'

import Auth from './Auth'

export default function Header() {
	const [isVisible, setVisible] = useState(false)
	const isAuth = false
	
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
				<button className="head_button_right">
					<p>Библиотека</p>
				</button>
					<button className="head_button_right profile" onClick={profile_click}>
						<div className="profile_pic">
							<img src={empty_profile} alt={empty_profile}/>
						</div>
						<p>Профиль</p>
						
					</button>
			</div>

			

			{isVisible ? ( localStorage.getItem('token') != null ? (
					<div className="dropdown">
						<button>
							<img src={logo} alt=""/>
							<p>{localStorage.getItem('token')}</p>
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
					</div>
				):(<Auth/>)
			):
		<div></div>
		}

		</div>
    )
}