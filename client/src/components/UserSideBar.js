import React from "react";
import "../styles/general.css";

function UserSideBar(){

    async function handleLogOut(){

    }

    return(
    <div className="col-3 position-fixed main-grad d-flex flex-column justify-content-end align-items-center" 
         style={{ height: "100vh" }}>
        <button type="button" className="btn btn-light mb-3" onClick={handleLogOut}>Cerrar sesión</button>
    </div>);

}

export default UserSideBar;