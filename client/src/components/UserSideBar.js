import React from "react";
import "../styles/general.css";
import axios from 'axios';
import { SERVER_ROUTE } from "../utils/constants";

function UserSideBar(){

    async function handleLogOut(){

    }

    return(
    <div className="sidebar main-grad d-flex flex-column justify-content-end align-items-center" 
         style={{ width: '400px', height: '100vh' }}>
        <button type="button" className="btn btn-light mb-3" onClick={handleLogOut}>Cerrar sesión</button>
    </div>);

}

export default UserSideBar;