import React, { useState } from "react";
import axios from "axios";

function BookmarkButton({postId, bookmarkStatus}){

    const [isBookmarked, setIsBookmarked] = useState(bookmarkStatus);

    async function handleBookmark(){

        if (isBookmarked){

            try {
                await axios.post(`https://mastodon.social/api/v1/statuses/${postId}/unbookmark`, {}, {
                    headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
                });
                setIsBookmarked(false);
            } catch (e){
                console.log("Ocurrió un error al quitar el guardado en la publicación", e);
            }
        } else {
            
            try {
                await axios.post(`https://mastodon.social/api/v1/statuses/${postId}/bookmark`, {}, {
                    headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
                });
                setIsBookmarked(true);
            } catch (e){
                console.log("Ocurrió un error al guardar la publicación", e);
            }
        }
    }

    return(
    <div type="button" onClick={handleBookmark}>
        {isBookmarked?
        (<i className="bi bi-bookmark-fill ms-4 me-1"></i>)
        :
        (<i className="bi bi-bookmark ms-4 me-1"></i>)}
    </div>
    );

}

export default BookmarkButton;