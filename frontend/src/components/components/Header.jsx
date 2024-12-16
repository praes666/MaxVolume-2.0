import { IoSearch } from "react-icons/io5"
import { useState } from 'react'
import { Link } from "react-router-dom"

import logo from '../../img/Kraken_logo.jpeg'

import '../../styles/header.css'

import Auth from './Auth'
import tokenCheck from '../scripts/tokenCheck'
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
				<button  className="logo mybutton">
					<img src={logo}/>
				</button>
				<Link to='/'>
					<button className="head_button_left mybutton">
						<p>Главная</p>
					</button>                
				</Link>
				<button className="head_button_left mybutton">
					<p>Новинки</p>
				</button>
				<div className="search">
					<input type="text" placeholder="Поиск..."/>
					<IoSearch className="searchButton"/>
				</div>    
				<button className="head_button_right mybutton" onClick={tokenCheck}>
					<p>Библиотека</p>
				</button>
				{localStorage.getItem('token') != null ? (
					<button className="head_button_right profile mybutton" onClick={profile_click}>
					<p>{JSON.parse(atob(localStorage.getItem('token').split('.')[1])).login}</p>
				</button>
				):(
					<button className="head_button_right profile mybutton" onClick={profile_click}>
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