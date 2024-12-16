import { FaHeart } from "react-icons/fa6";
import { BsPersonHeart, BsPersonFill  } from "react-icons/bs";
import { TbSquaresFilled } from "react-icons/tb";
import { IconContext } from "react-icons"
import { BiExit } from "react-icons/bi";
import { Link } from "react-router-dom"

import '../../styles/profileDropdown.scss'

export default function profileDropdown(){

    const deauth = async () => {
		localStorage.removeItem('token')
		location.reload();
	}

    return(
        <div className="dropdown">
            <IconContext.Provider value={{className: "profileDropIcons"}}>
                <Link>
                    <BsPersonFill />
                    <p>{JSON.parse(atob(localStorage.getItem('token').split('.')[1])).login}</p>
                </Link>
                <Link to='/likes'>
                        <FaHeart/>
                        <p>Лайки</p>
                </Link>
                <Link to='/playlists'>
                        <TbSquaresFilled/>
                        <p>Плейлисты</p>
                </Link>
                <Link to='/subscribes'>
                        <BsPersonHeart/>
                        <p>Подписки</p>
                </Link>
                <Link onClick={deauth}>
                    <BiExit/>
                    <p>Выход</p>
                </Link>
            </IconContext.Provider>
        </div>
    )
}