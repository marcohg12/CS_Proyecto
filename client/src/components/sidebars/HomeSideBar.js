import React from "react";
import "../../styles/general.css";
import axios from 'axios';
import { SERVER_ROUTE } from "../../utils/constants";

function HomeSideBar(){

    async function handleLogIn(){
        const response = await axios.get(SERVER_ROUTE + "/auth/login");
        const authorizationUrl = response.data.authorizationUrl;
        window.location.href = authorizationUrl;
    }

    return(
    <div className="col-3 position-fixed main-grad d-flex flex-column justify-content-end align-items-center" 
         style={{ height: '100vh' }}>
        <button type="button" className="btn btn-light mb-3" onClick={handleLogIn}>Iniciar sesión</button>
    </div>);

}

export default HomeSideBar;