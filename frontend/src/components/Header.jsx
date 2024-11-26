import { IoSearch } from "react-icons/io5"
import logo from '../img/Kraken_logo.jpeg'

import { useState } from 'react'
import { Link } from "react-router-dom"

import '../styles/header.css'

import Auth from './Auth'
import tokenCheck from './tokenCheck'
import ProfileDropdown from "./profileDropdown"

export default function Header() {
	const [isVisible, setVisible] = useState(false)

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



			{isVisible ? ( localStorage.getItem('token') != null ?
			(<ProfileDropdown/>):(<Auth/>)
			):
		<div></div>
		}

		</div>
    )
}