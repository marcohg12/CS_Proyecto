import React from "react";
import { Link } from "react-router-dom";
import "../styles/general.css";
import PostForm from "./post/PostForm";

function ActionsSideBar(){

    return(
    <div className="col-3 end-0 position-fixed d-flex flex-column justify-content-start z-0" 
         style={{ height: '100vh' }}>

            <div className="mt-4">
                <h1>Mapari</h1>
            </div>

            <div className="w-100 mt-4 border-bottom border-1">
                
                <form className="mb-4">
                    <div className="d-flex">
                        <input className="form-control" placeholder="Buscar..." />
                        <button type="submit" className="btn btn-primary ms-2">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </form>

                <PostForm/>

            </div>

            <div className="mt-4">

                <ul className="list-group">
                    <li className="list-group-item border-0">
                        <div className="d-flex justify-content-start align-items-center">
                            <i className="bi bi-house me-2" style={{ fontSize: '30px' }}></i>
                            <Link to="/main/home" className="no-link-styles mb-0">Inicio</Link>
                        </div>
                    </li>
                    <li className="list-group-item border-0">
                        <div className="d-flex justify-content-start align-items-center">
                            <i className="bi bi-person-circle me-2" style={{ fontSize: '30px' }}></i>
                            <Link to="/main/post" className="no-link-styles mb-0">Mi perfil</Link>
                        </div>
                    </li>
                    <li className="list-group-item border-0">
                        <div className="d-flex justify-content-start align-items-center">
                            <i className="bi bi-bell me-2" style={{ fontSize: '30px' }}></i>
                            <Link to="/" className="no-link-styles mb-0">Notificaciones</Link>
                        </div>
                    </li>
                    <li className="list-group-item border-0">
                        <div className="d-flex justify-content-start align-items-center">
                            <i className="bi bi-heart me-2" style={{ fontSize: '30px' }}></i>
                            <Link to="/" className="no-link-styles mb-0">Me gusta</Link>
                        </div>
                    </li>
                    <li className="list-group-item border-0">
                        <div className="d-flex justify-content-start align-items-center">
                            <i className="bi bi-gear me-2" style={{ fontSize: '30px' }}></i>
                            <Link to="/" className="no-link-styles mb-0">Ajustes</Link>
                        </div>
                    </li>
                </ul>

            </div>

    </div>);

}

export default ActionsSideBar;