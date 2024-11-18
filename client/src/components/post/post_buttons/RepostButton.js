import React, { useState } from "react";
import axios from "axios";

function RespostButton({postId, repostsCount, repostStaus, showRepostsCount, callbackOnChange}){

    const [reposts, setReposts] = useState(repostsCount);
    const [isReposted, setIsReposted] = useState(repostStaus);

    async function handleRepost(){

        if (isReposted){

            try {
                // Implementar quitar el compartido
            } catch (e){
                console.log("Ocurrió un error al quitar el compartido en la publicación", e);
            }

        } else {
            
            try {
                // Implementar poner el compartido
            } catch (e){
                console.log("Ocurrió un error al compartir la publicación", e);
            }
            
        }
    }

    return(
    <div type="button" onClick={handleRepost}>
        {isReposted?
        (<i className="bi bi-repeat ms-4 me-1" style={{color: "#50C878"}}></i>)
        :
        (<i className="bi bi-repeat ms-4 me-1"></i>)}
        {showRepostsCount? 
        (
        <span style={{ color: isReposted ? "#50C878" : "black" }}>
            {reposts}
        </span>
        ) 
        : 
        (<></>)}
    </div>
    );

}

export default RespostButton;