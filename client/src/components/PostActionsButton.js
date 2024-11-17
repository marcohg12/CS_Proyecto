import React from "react";
import { useUser } from "./UserContext";

function PostActionsButton({ postAccountId }){

    const { currentUser, loadingUser } = useUser();

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
                <li><button className="dropdown-item text-danger">Eliminar</button></li>
            </>) 
            : 
            (<></>)}
        </ul>
    </div>
    );

}

export default PostActionsButton;