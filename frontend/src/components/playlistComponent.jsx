export default function PlaylistComp({ name, img }){
    return(
        <div className="trackContainerBig">
            <div className="trackImg">
                <img src={img} alt="" />
            </div>
            <div className="trackInfo">
                <p className="trackName dots">{name}</p>
            </div>
        </div>
    )
}