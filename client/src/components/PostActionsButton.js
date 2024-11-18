import React from "react";
import { useUser } from "../providers/UserContext";
import axios from "axios";
import { useAlert } from "../providers/AlertContext";
import { useHomeTimeline } from "../providers/HomeTimelineContext";

function PostActionsButton({ postAccountId, postId }){

    const { showAlert } = useAlert();
    const { currentUser, loadingUser } = useUser();
    const { deletePost } = useHomeTimeline();

    async function handleDeletePost(){
        try {
            const response = await axios.delete(`https://mastodon.social/api/v1/statuses/${postId}`, {
                headers: {Authorization: `Bearer ${localStorage.getItem("mastodon_access_token")}`}
            });
            deletePost(response.data.id);
            showAlert("Se ha eliminado el debate exitosamente", "primary");
        } catch (e){
            showAlert("Ha ocurrido un error al eliminar tu debate, intenta de nuevo", "danger");
        }
    }

    return (
    <div className="dropdown">
        <div type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="bi bi-three-dots"></i>
        </div>
        <ul className="dropdown-menu">
            <li><button className="dropdown-item">Expandir</button></li>
            <li><button className="dropdown-item">Compartir</button></li>
            {!loadingUser && currentUser && (postAccountId === currentUser.id )? 
            (<>
                <li><hr className="dropdown-divider"/></li>
                <li><button className="dropdown-item">Editar</button></li>
                <li><button className="dropdown-item text-danger" onClick={handleDeletePost}>Eliminar</button></li>
            </>) 
            : 
            (<></>)}
        </ul>
    </div>
    );

}

export default PostActionsButton;