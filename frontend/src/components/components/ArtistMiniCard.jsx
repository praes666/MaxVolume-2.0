import { Link } from 'react-router-dom';
export default function ArtistMiniCard({ artistData }){
    return(
        <Link to={'/artist/' + artistData.name}>
            <div className="artistMiniCard">
                <img src={artistData.img} alt="" />
                <h3>{artistData.name}</h3>
            </div>
        </Link>
    )
}