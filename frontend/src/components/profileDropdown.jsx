import logo from '../img/Kraken_logo.jpeg'
import { Link } from "react-router-dom"

export default function profileDropdown(){
    const deauth = async () => {
		localStorage.removeItem('token')
		location.reload();
	}

    return(
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
    )
}