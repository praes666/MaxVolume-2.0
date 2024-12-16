export default function PlaylistCard({ name, img, playlist, onClickFunc }){
    return(
        <div className="trackContainerBig" onClick={() => onClickFunc(playlist)}>
            <div className="trackImgBig">
                <img src={img} alt="" />
            </div>
            <div className="trackInfoBig">
                <p className="trackNameBig dots">{name}</p>
            </div>
        </div>
    )
}