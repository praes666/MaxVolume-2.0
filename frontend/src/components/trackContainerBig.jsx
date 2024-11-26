import '../styles/TrackContainerBig.css'

export default function TrackContainerBig({ img, name, author }){
    return(
        <div className="trackContainerBig">
            <div className="trackImg">
                <img className="trackImg" src={img}/>
            </div>
            <div className="trackInfo">
                <button className='trackName'>
                    <p className='trackName'>{name}</p>
                </button>
                <button className='trackAuthor'>
                    <p className='trackAuthor'>{author}</p>
                </button>
                <p>Длительность</p>
            </div>
        </div>
    )
}