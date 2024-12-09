export default function PlaylistAbsoluteInv({ playlist, playlistFunc }){
    return(
        <div className="playlistInv" onClick={() => console.log("back")}>
           
                 {/* <div className="playlistInfo" onClick={() => playlistFunc(playlist)}>
                    if(playlist) <div className="playlistInfo" onClick={() => playlistFunc(playlist)}>
                        else <div className="playlistInfo"></div>
                    <p>{playlist?.name}</p>
                 </div>  */}
            <div className="playlistInfo" onClick={() => playlistFunc(playlist)}>
                <p>{playlist?.name}</p>
            </div>
        </div>
    )
}