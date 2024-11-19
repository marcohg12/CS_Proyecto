import React, { useState } from "react";
import axios from "axios";

function RespostButton({postId, repostsCount, repostStaus, showRepostsCount, callbackOnChange}){

    const [reposts, setReposts] = useState(repostsCount);
    const [isReposted, setIsReposted] = useState(repostStaus);

    async function handleRepost(){

        if (isReposted){

            try {
                // Quitar el compartido
                await axios.post(`https://mastodon.social/api/v1/statuses/${postId}/unreblog`, {}, {
                    headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
                });
                setReposts(reposts - 1);
                setIsReposted(false);

                if(callbackOnChange){
                    callbackOnChange(reposts - 1);
                }
            } catch (e){
                console.log("Ocurrió un error al quitar el compartido en la publicación", e);
            }

        } else {
            
            try {
                // Poner el compartido
                await axios.post(`https://mastodon.social/api/v1/statuses/${postId}/reblog`, {}, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}` }
                });
                setReposts(reposts + 1);
                setIsReposted(true);

                if(callbackOnChange){
                    callbackOnChange(reposts + 1);
                }
            } catch (e){
                console.log("Ocurrió un error al compartir la publicación", e);
            }
            
        }
        console.log("Después de la acción:", { isReposted, reposts });
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
