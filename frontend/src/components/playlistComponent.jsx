export default function PlaylistComp({ name, img, playlist, onClickFunc }){
    return(
        <div className="trackContainerBig" onClick={() => onClickFunc(playlist)}>
            <div className="trackImg">
                <img src={img} alt="" />
            </div>
            <div className="trackInfo">
                <p className="trackName dots">{name}</p>
            </div>
        </div>
    )
}