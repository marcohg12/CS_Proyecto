import React from "react";
import "../styles/general.css";
import { useUser } from "../providers/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function UserSideBar(){
    
    const { currentUser, loadingUser } = useUser();
    const navigate = useNavigate();

    async function handleLogOut(){
        localStorage.removeItem("mastodon_access_token");
        navigate("/");
    }
    
    return(
    <div className="col-3 position-fixed main-grad d-flex flex-column justify-content-between align-items-center z-0"
          style={{ height: '100vh', padding: '1rem' }}
    >
        
        <div className="d-flex flex-column align-items-center mt-4">   
            {!loadingUser && currentUser? 
            (<>
            <img
                src={currentUser.avatar}
                alt="Mi foto de perfil"
                className="rounded-circle mb-1"
                style={{ width: '90px', height: '90px' }}
                />
            <Link className="no-link-styles" to={`/main/profile/${currentUser.id}`}>
                <p className="text-center fw-bold text-light">@{currentUser.username}</p>
            </Link>
            </>) : 
            (<></>)}
        </div>
        
        <button
            type="button"
            className="btn btn-light mb-3"
            onClick={handleLogOut}
            style={{ position: 'absolute', bottom: '1rem' }}
        >
            Cerrar sesión
        </button>

    </div>
    );

}

export default UserSideBar;