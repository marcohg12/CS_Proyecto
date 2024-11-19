import React, { useState } from "react";
import axios from "axios";

function BookmarkButton({postId, bookmarkStatus}){

    const [isBookmarked, setIsBookmarked] = useState(bookmarkStatus);

    async function handleBookmark(){

        if (isBookmarked){

            try {
                // Implementar quitar el guardado
            } catch (e){
                console.log("Ocurrió un error al quitar el guardado en la publicación", e);
            }
        } else {
            
            try {
                // Implementar guardar la publicación
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