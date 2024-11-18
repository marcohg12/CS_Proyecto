import React, { useState } from "react";
import axios from "axios";

function LikeButton({postId, likesCount, likeStatus, showLikesCount, callbackOnChange}){

    const [likes, setLikes] = useState(likesCount);
    const [isLiked, setIsLiked] = useState(likeStatus);

    async function handleLike(){

        if (isLiked){

            try {
                await axios.post(`https://mastodon.social/api/v1/statuses/${postId}/unfavourite`, {}, {
                    headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
                });
                setLikes(likes - 1);
                setIsLiked(false);

                if (callbackOnChange){
                    callbackOnChange(likes - 1);
                }
            } catch (e){
                console.log("Ocurrió un error al quitar el me gusta en la publicación", e);
            }
        } else {
            
            try {
                await axios.post(`https://mastodon.social/api/v1/statuses/${postId}/favourite `, {}, {
                    headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
                });
                setLikes(likes + 1);
                setIsLiked(true);

                if (callbackOnChange){
                    callbackOnChange(likes + 1);
                }
            } catch (e){
                console.log("Ocurrió un error al dar me gusta en la publicación", e);
            }
        }
    }

    return(
    <div type="button" onClick={handleLike}>
        {isLiked?
        (<i className="bi bi-heart-fill ms-4 me-1" style={{color: "#ff4d4d"}}></i>)
        :
        (<i className="bi bi-heart ms-4 me-1"></i>)}
        {showLikesCount? 
        (
        <span style={{ color: isLiked ? "#ff4d4d" : "black" }}>
            {likes}
        </span>
        ) 
        : 
        (<></>)}
    </div>
    );

}

export default LikeButton;